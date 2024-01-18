import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getBreeds } from '../store/reducers/breeds/asyncThunk'

export const useGetBreeds = () => {
    const loading = useAppSelector((state) => state.breeds.loading)
    const breedsList = useAppSelector((state) => state.breeds.breedsList)
    const globalError = useAppSelector((state) => state.breeds.globalError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Щоб при переході між сторінками не бралися знов дані
        if (!breedsList.length) {
            dispatch(getBreeds())
        }
    }, [])

    return {
        globalError,
        loading,
        breedsList,
    }
}
