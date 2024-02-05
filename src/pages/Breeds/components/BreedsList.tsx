import React from 'react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import classes from '../styles/breedsList.module.scss'

import Button from '../../../components/Button'
import { Alert } from 'react-bootstrap'

import { useGetBreeds } from '../../../hooks/useGetBreeds'

const BreedsList: FC = () => {
    const [, setSearchParams] = useSearchParams()
    const { globalError, loading, breedsList } = useGetBreeds()

    const setBreedParams = (breedId: string) => {
        setSearchParams({
            activeBreed: breedId,
        })
    }

    if (loading && !breedsList?.length) {
        return 'loading...'
    }

    if (!breedsList?.length || globalError) {
        return <Alert variant="danger">{globalError || 'Cats not found.'}</Alert>
    }

    return (
        <ul className={classes['breeds-list']}>
            {breedsList.map((item) => (
                <li className={classes['breeds-item']} key={item.id}>
                    <Button type="info" onClick={() => setBreedParams(item.id)}>
                        {item.name}
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default BreedsList
