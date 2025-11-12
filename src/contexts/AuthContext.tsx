import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLOUD_PREPPER_BASE_URL } from '../../env.json';

interface User {
    id: number;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt?: string;
    lastLogin?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, role?: 'user' | 'admin') => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            // Verify token is still valid
            verifyToken(storedToken).catch(() => {
                // Token invalid, clear auth
                logout();
            });
        }
        setLoading(false);
    }, []);

    const verifyToken = async (authToken: string): Promise<void> => {
        try {
            const url = `${CLOUD_PREPPER_BASE_URL}/api/auth/verify`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Token verification failed');
            }

            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                throw new Error('Invalid response format from server');
            }

            if (data.success && data.user) {
                setUser(data.user);
            } else {
                throw new Error('Token invalid');
            }
        } catch (error) {
            console.error('Token verification error:', error);
            throw error;
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const url = `${CLOUD_PREPPER_BASE_URL}/api/auth/login`;
            console.log('Attempting login to:', url);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            console.log('Login response status:', response.status, response.statusText);

            // Handle 404 specifically - endpoint doesn't exist
            if (response.status === 404) {
                throw new Error(
                    'Authentication endpoint not found. The backend server may not have authentication endpoints implemented. ' +
                    `Please ensure the backend at ${CLOUD_PREPPER_BASE_URL} has the /api/auth/login endpoint.`
                );
            }

            // Check if response is JSON before parsing
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                if (response.status === 404) {
                    throw new Error(
                        'Authentication endpoint not found. The backend server may not have authentication endpoints implemented. ' +
                        `Please ensure the backend at ${CLOUD_PREPPER_BASE_URL} has the /api/auth/login endpoint.`
                    );
                }
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                throw new Error(data.message || data.error || `Login failed: ${response.status} ${response.statusText}`);
            }

            if (!data.success) {
                throw new Error(data.message || data.error || 'Login failed');
            }

            // Store auth data
            const authToken = data.token;
            const userData = data.user;

            if (!authToken || !userData) {
                throw new Error('Invalid response: missing token or user data');
            }

            setToken(authToken);
            setUser(userData);
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

            console.log('Login successful for user:', userData.email);

        } catch (error) {
            console.error('Login error:', error);
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Please check if the backend is running.');
            }
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string, role: 'user' | 'admin' = 'user'): Promise<void> => {
        try {
            const url = `${CLOUD_PREPPER_BASE_URL}/api/auth/register`;
            console.log('Attempting registration to:', url);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, role })
            });

            console.log('Registration response status:', response.status, response.statusText);

            // Handle 404 specifically - endpoint doesn't exist
            if (response.status === 404) {
                throw new Error(
                    'Registration endpoint not found. The backend server may not have authentication endpoints implemented. ' +
                    `Please ensure the backend at ${CLOUD_PREPPER_BASE_URL} has the /api/auth/register endpoint.`
                );
            }

            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                if (response.status === 404) {
                    throw new Error(
                        'Registration endpoint not found. The backend server may not have authentication endpoints implemented. ' +
                        `Please ensure the backend at ${CLOUD_PREPPER_BASE_URL} has the /api/auth/register endpoint.`
                    );
                }
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                throw new Error(data.message || data.error || `Registration failed: ${response.status} ${response.statusText}`);
            }

            if (!data.success) {
                throw new Error(data.message || data.error || 'Registration failed');
            }

            // Auto-login after registration
            const authToken = data.token;
            const userData = data.user;

            if (!authToken || !userData) {
                throw new Error('Invalid response: missing token or user data');
            }

            setToken(authToken);
            setUser(userData);
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('auth_user', JSON.stringify(userData));

            console.log('Registration successful for user:', userData.email);

        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Please check if the backend is running.');
            }
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    };

    const value: AuthContextType = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
