import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from './store'

import Header from './components/Header'
import { Alert } from 'react-bootstrap'

interface AppProps {}

const App: FC<AppProps> = () => {
    const globalError = useAppSelector((state) => state.cats.globalError)

    return (
        <section className={'container'}>
            <Header />
            {globalError ? <Alert variant="danger">{globalError}</Alert> : null}
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default App
