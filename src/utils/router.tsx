import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'

import Error from '../pages/Error/'
import RandomCats from '../pages/RandomCats'
import Breads from '../pages/Breads/index.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <RandomCats /> },
            {
                path: '/breads',
                element: <Breads />,
            }
        ],
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
        name: 'Breads',
        url: '/breads',
    },
    {
        name: 'My Favorite',
        url: '/favorite',
    },
]
