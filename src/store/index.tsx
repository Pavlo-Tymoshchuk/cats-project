import { configureStore } from '@reduxjs/toolkit'
import cats from './reducers/cats'
import breeds from './reducers/breeds'

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        cats,
        breeds
    },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export type RootState = ReturnType<typeof store.getState>