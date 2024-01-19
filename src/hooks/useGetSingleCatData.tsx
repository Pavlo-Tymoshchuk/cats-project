import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import { api } from '../utils/api'
import { Cat as CatType } from '../dto/catsTypes'

import { NAME_SERCH_CAT } from '../utils/constants'

interface SingleCatData {
    catId: string | null
}

export const useGetSingleCatData = ({ catId }: SingleCatData) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeCatData, setActiveCatData] = useState<CatType | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const clearParams = () => {
        searchParams.delete(NAME_SERCH_CAT)
        setSearchParams(searchParams)
        setActiveCatData(null)
    }

    useEffect(() => {
        // Тут можно було оптимізувати і не тягнути дані кожен раз
        // Брати інформацію по коту ці стору, якщо він там є
        // якщо немає, то вже робити запит
        // Попередньо треба у чторі зробити індексацію катів по id
        // Для пошуку по об'єкту, а не методом find
        if (catId) {
            setLoading(true)
            api.get(`https://api.thecatapi.com/v1/images/${catId}`)
                .then((response) => {
                    if (response.data) {
                        setActiveCatData(response.data)
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
    }, [catId])

    return {
        clearParams,
        activeCatData,
        activeCatDataError: error,
        activeCatDataLoading: loading,
    }
}
