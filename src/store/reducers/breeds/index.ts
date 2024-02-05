import { createSlice } from '@reduxjs/toolkit'
import { getBreeds } from './asyncThunk'

import { Breed } from '../../../dto/catsTypes'


interface BreedsState {
    breedsList: Breed[]
    loading: boolean
    globalError: string | null
}

const initialState: BreedsState = {
    breedsList: [],
    loading: false,
    globalError: null,
}

const catsSlice = createSlice({
    name: 'breeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBreeds.pending, (state) => {
                state.loading = true
                state.globalError = null
            })
            .addCase(getBreeds.fulfilled, (state, action) => {
                state.loading = false
                state.breedsList = action.payload
            })
            .addCase(getBreeds.rejected, (state, action) => {
                state.loading = false

                if (typeof action.payload === 'string') {
                    state.globalError = action.payload
                } else {
                    state.globalError = null
                }
            })
    },
})

export default catsSlice.reducer
