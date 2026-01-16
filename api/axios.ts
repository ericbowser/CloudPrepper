// src/lib/axios.ts - Authenticated axios instance
import axios from 'axios';
import { addBreadcrumb, captureException, apiRequest, apiSuccess, apiError } from '../src/config/sentry';
import { CLOUD_PREPPER_BASE_URL } from '../src/config/env';

// Create an axios instance with base configuration
const apiClient = axios.create({
    baseURL: CLOUD_PREPPER_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach auth token and log to Sentry
apiClient.interceptors.request.use(
    (config) => {
        // Get token from sessionStorage
        const token = sessionStorage.getItem('auth_token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log API request to Sentry
        const method = config.method?.toUpperCase() || 'GET';
        const url = config.url || '';
        const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url;
        apiRequest(fullUrl, method);
        
        return config;
    },
    (error) => {
        // Log request error to Sentry
        captureException(error, {
            component: 'axios',
            action: 'request_interceptor',
            extra: { error: error.message }
        });
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors and log to Sentry
apiClient.interceptors.response.use(
    (response) => {
        // Log successful API response to Sentry
        const method = response.config.method?.toUpperCase() || 'GET';
        const url = response.config.url || '';
        const fullUrl = response.config.baseURL ? `${response.config.baseURL}${url}` : url;
        apiSuccess(fullUrl, response.status);
        
        return response;
    },
    (error) => {
        const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
        const url = error.config?.url || '';
        const fullUrl = error.config?.baseURL ? `${error.config.baseURL}${url}` : url;
        const status = error.response?.status || 'NETWORK_ERROR';
        
        // Log API error to Sentry
        apiError(fullUrl, error.message || `HTTP ${status}`);
        
        if (error.response?.status === 401) {
            // Token expired or invalid
            console.error('Authentication failed - token may be expired');
            
            // Log auth failure to Sentry
            addBreadcrumb('auth', 'Authentication token expired', {
                endpoint: fullUrl,
                method
            }, 'warning');
            
            // Optionally redirect to login or trigger a logout
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('auth_user');
        } else if (error.response) {
            // Log non-auth errors with more context
            captureException(error, {
                component: 'axios',
                action: 'api_call',
                extra: {
                    url: fullUrl,
                    method,
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                }
            });
        } else {
            // Network errors
            captureException(error, {
                component: 'axios',
                action: 'network_error',
                extra: {
                    url: fullUrl,
                    method,
                    message: error.message
                }
            });
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
