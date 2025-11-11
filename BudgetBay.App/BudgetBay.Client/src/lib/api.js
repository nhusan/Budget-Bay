import axios from 'axios';

// Define and export the base URL for API requests
export const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to requests
api.interceptors.request.use(
    config => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            try {
                // The token is stored as a JSON string (e.g., "\"your-token-here\""), so we parse it.
                const token = JSON.parse(storedToken);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Could not parse auth token from localStorage", error);
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);