import axios from 'axios'
import { api } from '../../../../utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../../store'

export const fetchRandomCats = createAsyncThunk('girls/fetchRandomCats', async function (_, { getState, rejectWithValue }) {
    const state = getState() as RootState

    const pageParam = state.cats.page

    try {
        const response = await api.get('https://api.thecatapi.com/v1/images/search', {
            params: {
                limit: 10,
                page: pageParam,
            },
        })

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        } else {
            console.error('unexpected error: ', error)
            return rejectWithValue('An unexpected error occurred')
        }
    }
})
