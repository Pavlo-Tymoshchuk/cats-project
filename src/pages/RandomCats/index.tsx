import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import classes from './styles/randomCats.module.scss'

import { fetchRandomCats } from '../../store/reducers/cats/asyncThunk'
import CatCard from '../../components/CatCard'
import { Alert } from 'react-bootstrap'
import Button from '../../components/Button'
import CatModal from '../../components/CatModal'

import { createCatTitle } from '../../utils/helpers'

interface RandomCatsProps {}

const RandomCats: FC<RandomCatsProps> = () => {
    const canLoadMore = useAppSelector((state) => state.cats.canLoadMore)
    const page = useAppSelector((state) => state.cats.page)
    const loading = useAppSelector((state) => state.cats.loading)
    const catsList = useAppSelector((state) => state.cats.catsList)
    const globalError = useAppSelector((state) => state.cats.globalError)
    const dispatch = useAppDispatch()

    const loadMoreCats = () => {
        const newPage = page + 1
        dispatch(fetchRandomCats(newPage))
    }

    useEffect(() => {
        // Щоб при переході між сторінками не бралися знов дані
        if (!catsList.length) {
            dispatch(fetchRandomCats(page))
        }
    }, [])

    if (loading && !catsList?.length) {
        return 'loading...'
    }

    if (!catsList?.length || globalError) {
        return <Alert variant="danger">{globalError || 'Cats not found.'}</Alert>
    }

    return (
        <>
            <section className={classes['random-cats']}>
                <ul className={classes['random-cats-list']}>
                    {catsList.map((item) => (
                        <CatCard imageUrl={item.url} name={createCatTitle(item?.breeds)} catId={item.id} key={item.id} />
                    ))}
                </ul>
                {canLoadMore ? (
                    <div className={classes['random-cats-more']}>
                        <Button type="primary" onClick={loadMoreCats} loading={loading}>
                            Load more cats
                        </Button>
                    </div>
                ) : null}
            </section>
            <CatModal />
        </>
    )
}

export default RandomCats
