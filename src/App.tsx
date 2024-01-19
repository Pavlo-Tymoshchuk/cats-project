import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import CatModal from './components/CatModal'

const App: FC = () => {
    return (
        <>
            <section className={'container'}>
                <Header />
                <main>
                    <Outlet />
                </main>
            </section>

            <CatModal />
        </>
    )
}

export default App
