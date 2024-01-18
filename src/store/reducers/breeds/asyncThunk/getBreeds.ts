import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../../utils/api'

export const getBreeds = createAsyncThunk('breeds/getBreeds', async function (_, { rejectWithValue }) {
    try {
        const response = await api.get('https://api.thecatapi.com/v1/breeds')

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
