import axios from 'axios';

const API_URL =  `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
    baseURL: API_URL
});

// Add interceptors for error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default api;