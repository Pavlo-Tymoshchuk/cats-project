import React from 'react'
import { FC, ComponentProps, PropsWithChildren } from 'react'

import { Button as ButtonUi, Spinner } from 'react-bootstrap'

interface ButtonProps {
    onClick?: ComponentProps<'button'>['onClick']
    type?: string
    loading?: boolean
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ onClick, loading, children, type }) => {
    return (
        <ButtonUi className="position-relative" onClick={onClick} variant={type || 'primary'} disabled={loading}>
            {loading ? (
                <span className="position-absolute top-50 start-50 translate-middle">
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="visually-hidden">Loading...</span>
                </span>
            ) : null}
            {children}
        </ButtonUi>
    )
}

export default Button
