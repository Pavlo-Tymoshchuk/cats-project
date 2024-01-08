import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import { RootState } from '../../../../store'

export const fetchRandomCats = createAsyncThunk('girls/fetchRandomCats', async function (_, { getState, rejectWithValue }) {
    // const state = getState() as RootState


    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')

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
