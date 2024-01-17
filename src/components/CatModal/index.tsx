import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../../utils/api'

import classes from './styles/catModal.module.scss'

import { Modal, Image } from 'react-bootstrap'
import { Cat as CatType } from '../../dto/catsTypes'
import Button from '../Button'

import { createCatTitle } from '../../utils/helpers'
import { useFavoriteManipulations } from '../../hooks/useFavoriteManipulations'

const CatModal: FC = () => {
    const [activeCat, setActiveCat] = useState<CatType | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const activeCatId = searchParams.get('activeCat')
    const { loadingFavorite, favoriteActionMethod, favoriteImageStatus } = useFavoriteManipulations({catId: activeCatId})

    const clearParams = () => {
        searchParams.delete('activeCat')
        setSearchParams(searchParams)
        setActiveCat(null)
    }

    const createModalTitle = () => {
        if (error) {
            return error
        }

        if (loading) {
            return 'Loading..'
        }

        return createCatTitle(activeCat?.breeds)
    }

    const goToBreedsPage = (id: string) => {
        return () => {
            navigate(`/breads?activeBreed=${id}`)
        }
    }

    const setDescription = () => {
        if (activeCat?.breeds?.length) {
            return (
                <ol className={classes['breeds-list']}>
                    {activeCat.breeds.map((item) => (
                        <li className={classes['breeds-item']}>
                            <p>{item.description}</p>
                            <Button onClick={goToBreedsPage(item.id)}>About {item.name}</Button>
                        </li>
                    ))}
                </ol>
            )
        }

        return null
    }

    useEffect(() => {
        // Тут можно було оптимізувати і не тягнути дані кожен раз
        // Брати інформацію по коту ці стору, якщо він там є
        // якщо немає, то вже робити запит
        // Попередньо треба у чторі зробити індексацію катів по id
        // Для пошуку по об'єкту, а не методом find
        if (activeCatId) {
            setLoading(true)
            api.get(`https://api.thecatapi.com/v1/images/${activeCatId}`)
                .then((response) => {
                    if (response.data) {
                        setActiveCat(response.data)
                    }
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        return setError(error.message)
                    } else {
                        console.error('unexpected error: ', error)
                        return setError('An unexpected error occurred')
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [activeCatId])

    return (
        <Modal show={!!activeCatId} onHide={clearParams} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{createModalTitle()}</Modal.Title>
            </Modal.Header>
            {activeCat?.url ? (
                <div className={classes['image-wrapper']}>
                    <Image src={activeCat?.url} thumbnail alt={createModalTitle()} />
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
