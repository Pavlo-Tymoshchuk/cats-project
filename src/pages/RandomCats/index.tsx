import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import classes from './styles/randomCats.module.scss'

import { fetchRandomCats } from '../../store/reducers/cats/asyncThunk'
import CatCard from '../../components/CatCard'

interface RandomCatsProps {}

const RandomCats: FC<RandomCatsProps> = () => {
    const loading = useAppSelector((state) => state.cats.loading)
    const catsList = useAppSelector((state) => state.cats.catsList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRandomCats())
    }, [])

    if (loading) {
        return 'loading...'
    }

    if (!catsList?.length) {
        return 'Cats not found.'
    }

    return (
        <section className={classes['random-cats']}>
            <ul className={classes['random-cats-lit']}>
                {catsList.map((item) => (
                    <CatCard />
                ))}
            </ul>
        </section>
    )
}

export default RandomCats
