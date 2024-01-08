import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

export const api = axios.create({
    headers: {
        'x-api-key': API_KEY,
    },
})