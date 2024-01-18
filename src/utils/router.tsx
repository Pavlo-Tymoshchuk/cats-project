import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'

import Error from '../pages/Error/'
import RandomCats from '../pages/RandomCats'
import Breeds from '../pages/Breeds'
import Favorites from '../pages/Favorites'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <RandomCats /> },
            {
                path: '/breads',
                element: <Breeds />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
            },
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
        url: '/favorites',
    },
]
