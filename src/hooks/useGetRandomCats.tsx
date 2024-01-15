import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { getRandomCats } from '../store/reducers/cats/asyncThunk'
import { setCatsPage } from '../store/reducers/cats'

export const useGetRandomCats = () => {
    const canLoadMore = useAppSelector((state) => state.cats.canLoadMore)
    const page = useAppSelector((state) => state.cats.page)
    const loading = useAppSelector((state) => state.cats.loading)
    const catsList = useAppSelector((state) => state.cats.catsList)
    const globalError = useAppSelector((state) => state.cats.globalError)
    const dispatch = useAppDispatch()

    const loadMoreCats = () => {
        const newPage = page + 1
        dispatch(getRandomCats(newPage))
        dispatch(setCatsPage())
    }

    useEffect(() => {
        // Щоб при переході між сторінками не бралися знов дані
        if (!catsList.length) {
            dispatch(getRandomCats(page))
        }
    }, [])

    return {
        canLoadMore,
        globalError,
        loading,
        catsList,
        loadMoreCats,
    }
}
