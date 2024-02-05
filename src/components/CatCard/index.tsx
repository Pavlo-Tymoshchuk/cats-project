import React from 'react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Card } from 'react-bootstrap'
import Button from '../Button'

import { NAME_SERCH_CAT } from '../../utils/constants'

interface CatCardProps {
    imageUrl: string
    name: string
    catId: string
}

const CatCard: FC<CatCardProps> = ({ imageUrl, name, catId }) => {
    const [, setSearchParams] = useSearchParams()

    const setCatParams = () => {
        setSearchParams({
            [NAME_SERCH_CAT]: catId,
        })
    }

    return (
        <Card>
            <Card.Img variant="top" src={imageUrl} onClick={setCatParams} role="button" alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button type="info" onClick={setCatParams}>
                    Read more
                </Button>
            </Card.Body>
        </Card>
    )
}

export default CatCard
