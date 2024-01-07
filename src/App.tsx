import { FC } from 'react'
import { Button } from 'flowbite-react'

interface AppProps {}

const App: FC<AppProps> = () => {
    return (
        <>
            <h1 className="text-3xl font-bold text-red-400">Hello world!</h1>
            <Button color="dark">Click</Button>
        </>
    )
}

export default App
