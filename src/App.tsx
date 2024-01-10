import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'

interface AppProps {}

const App: FC<AppProps> = () => {
    return (
        <section className={'container'}>
            <Header />
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default App
