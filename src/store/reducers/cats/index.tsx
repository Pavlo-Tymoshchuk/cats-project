import { createSlice } from '@reduxjs/toolkit'
import { fetchRandomCats } from './asyncThunk'

import { Cat } from '../../../dto/catsTypes'

interface CatState {
    catsList: Cat[]
    page: number
    loading: boolean
    globalError: string | null
}

const initialState: CatState = {
    catsList: [],
    page: 0,
    loading: false,
    globalError: null,
}

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        setCatsList(state, action) {
            state.catsList = [...state.catsList, ...action.payload]
        },
        setCatsPage(state) {
            state.page += 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomCats.pending, (state) => {
                state.loading = true
                state.globalError = null
            })
            .addCase(fetchRandomCats.fulfilled, (state, action) => {
                state.loading = false
                state.catsList = [...state.catsList, ...action.payload]
            })
            .addCase(fetchRandomCats.rejected, (state, action) => {
                state.loading = false

                if (typeof action.payload === 'string') {
                    state.globalError = action.payload
                } else {
                    state.globalError = null
                }
            })
    },
})

export const { setCatsList } = catsSlice.actions

export default catsSlice.reducer
