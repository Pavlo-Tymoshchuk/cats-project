import { FC } from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import classes from './styles/error.module.scss'
import classNames from 'classnames'

interface ErrorProps {}

const Error: FC<ErrorProps> = () => {
    const error = useRouteError()

    return (
        <section className={classes['error-page']}>
            <h1>Oops!</h1>
            <div className={classNames("alert alert-danger", classes['error-page-alert'])}>
                <p>Sorry, something went wrong </p>
                {isRouteErrorResponse(error) ? <p>{error.statusText ?? error.data?.message}</p> : null}
            </div>
        </section>
    )
}

export default Error
