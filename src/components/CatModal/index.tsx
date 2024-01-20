import { FC } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import classes from './styles/catModal.module.scss'

import { Modal, Image } from 'react-bootstrap'
import Button from '../Button'

import { createCatTitle } from '../../utils/helpers'
import { NAME_SERCH_CAT } from '../../utils/constants'
import { useFavoriteManipulations } from '../../hooks/useFavoriteManipulations'
import { useGetSingleCatData } from '../../hooks/useGetSingleCatData'

const CatModal: FC = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const activeCatId = searchParams.get(NAME_SERCH_CAT)
    const { activeCatData, activeCatDataError, activeCatDataLoading, clearParams } = useGetSingleCatData({ catId: activeCatId })
    const { loadingFavorite, favoriteActionMethod, favoriteImageStatus } = useFavoriteManipulations({ catId: activeCatId })

    const createModalTitle = () => {
        if (activeCatDataError) {
            return activeCatDataError
        }

        if (activeCatDataLoading) {
            return 'Loading..'
        }

        return createCatTitle(activeCatData?.breeds)
    }

    const goToBreedsPage = (id: string) => {
        return () => {
            navigate(`/breads?activeBreed=${id}`)
        }
    }

    const setDescription = () => {
        if (activeCatData?.breeds?.length) {
            return (
                <ol className={classes['breeds-list']}>
                    {activeCatData.breeds.map((item) => (
                        <li className={classes['breeds-item']} key={item.id}>
                            <p>{item.description}</p>
                            <Button onClick={goToBreedsPage(item.id)}>About {item.name}</Button>
                        </li>
                    ))}
                </ol>
            )
        }

        return null
    }

    return (
        <Modal show={!!activeCatId} onHide={clearParams} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{createModalTitle()}</Modal.Title>
            </Modal.Header>
            {activeCatData?.url ? (
                <div className={classes['image-wrapper']}>
                    <Image src={activeCatData?.url} thumbnail alt={createModalTitle()} />
                    <div className={classes['favorite-btn']}>
                        <Button loading={loadingFavorite} onClick={favoriteActionMethod}>
                            <img src={favoriteImageStatus} alt="heart-icon" />
                        </Button>
                    </div>
                </div>
            ) : null}
            <Modal.Body>{setDescription()}</Modal.Body>
        </Modal>
    )
}

export default CatModal
