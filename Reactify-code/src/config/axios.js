import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001',
    withCredentials: true, // Important for cookies/authentication
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Clear local storage and redirect to login
            localStorage.clear();
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default api; 