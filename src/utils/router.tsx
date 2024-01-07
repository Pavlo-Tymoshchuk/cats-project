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
