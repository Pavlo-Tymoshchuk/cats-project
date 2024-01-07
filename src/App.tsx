import { FC } from 'react'
// import { Button } from 'flowbite-react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

interface AppProps {}

const App: FC<AppProps> = () => {
    return (
        <>
            <h1 className="text-3xl font-bold text-red-400">Hello world!</h1>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default App
