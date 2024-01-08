import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../store'

import { fetchRandomCats } from '../../store/reducers/cats/asyncThunk'

interface RandomCatsProps {}

const RandomCats: FC<RandomCatsProps> = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRandomCats())
    }, [])

    return 'cats'
}

export default RandomCats
