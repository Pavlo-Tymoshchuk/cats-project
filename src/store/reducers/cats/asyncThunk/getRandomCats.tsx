import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../../../utils/api'
import { CATS_LIMIT } from '../index'

export const getRandomCats = createAsyncThunk('cats/getRandomCats', async function (pageParam: number, { rejectWithValue }) {
    try {
        const response = await api.get('https://api.thecatapi.com/v1/images/search', {
            params: {
                limit: CATS_LIMIT,
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
