import { useEffect, useState } from 'react'
import { api } from '../utils/api'

const USET_NAME = import.meta.env.VITE_USET_NAME

interface FavoriteManipulations {
    catId: string | null
}

export const useFavoriteManipulations = ({ catId }: FavoriteManipulations) => {
    const [favoriteId, setFavoriteId] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const createLike = async () => {
        setLoading(true)
        api.post('https://api.thecatapi.com/v1/favourites', {
            image_id: catId,
            sub_id: USET_NAME,
        })
            .then((response) => {
                setFavoriteId(response.data.id)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const deleteLike = async () => {
        setLoading(true)
        api.delete(`https://api.thecatapi.com/v1/favourites/${favoriteId}`)
            .then(() => {
                setFavoriteId(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (catId) {
            setLoading(true)
            api.get('https://api.thecatapi.com/v1/favourites', {
                params: {
                    image_id: catId,
                    sub_id: USET_NAME,
                },
            })
                .then((response) => {
                    setFavoriteId(response.data[0]?.id)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [catId])


    return {
        loadingFavorite: loading,
        favoriteActionMethod: favoriteId ? deleteLike : createLike,
        favoriteImageStatus: favoriteId ? '/full-heart.svg' : '/emty-heart.svg'
    }
}
