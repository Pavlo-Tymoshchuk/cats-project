import { FC } from 'react'
import classes from './styles/randomCats.module.scss'

import CatCard from '../../components/CatCard'
import { Alert } from 'react-bootstrap'
import Button from '../../components/Button'
import CatModal from '../../components/CatModal'

import { useGetRandomCats } from '../../store/reducers/cats/hooks/useGetRandomCats'

import { createCatTitle } from '../../utils/helpers'

const RandomCats: FC = () => {
    const { canLoadMore, globalError, loading, catsList, loadMoreCats } = useGetRandomCats()

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
