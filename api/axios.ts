// src/lib/axios.ts - Authenticated axios instance
import axios from 'axios';
import { CLOUD_PREPPER_BASE_URL } from '../src/config/env';

// Create an axios instance with base configuration
const apiClient = axios.create({
    baseURL: CLOUD_PREPPER_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach auth token
apiClient.interceptors.request.use(
    (config) => {
        // Get token from sessionStorage
        const token = sessionStorage.getItem('auth_token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            console.error('Authentication failed - token may be expired');
            // Optionally redirect to login or trigger a logout
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('auth_user');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
