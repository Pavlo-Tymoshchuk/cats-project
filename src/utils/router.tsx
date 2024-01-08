import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'

import Error from '../pages/Error/'
import RandomCats from '../pages/RandomCats'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [{ index: true, element: <RandomCats /> }],
    },
])

interface RouterList {
    name: string
    url: string
}

export const routerList: RouterList[] = [
    {
        name: 'Random Cats',
        url: '/',
    },
    {
        name: 'My Favorite',
        url: '/favorite',
    },
]
