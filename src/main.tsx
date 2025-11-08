import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/output.css';
import {ThemeProvider} from "./Theme/ThemeContext";
import CloudPrepApp from "./App";
import {QuestionProvider} from "./components/Question/QuestionContext";
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from './lib/queryClient';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import AdminPage from './components/pages/AdminPage';
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {ProtectedRoute} from './components/Auth/ProtectedRoute';
import {Login} from './components/Auth/Login';
import {Register} from './components/Auth/Register';

// Navigation component (needs to be inside AuthProvider to use useAuth)
const Navigation = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-slate-900 to-purple-900 border-b border-white/10">
            <div className="mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex gap-6">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-300 transition-colors font-medium"
                    >
                        Quiz
                    </Link>
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-white hover:text-blue-300 transition-colors font-medium"
                        >
                            Admin
                        </Link>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-white/80 text-sm">
                                Welcome, <span className="font-semibold text-white">{user?.username}</span>
                                {isAdmin && <span className="ml-2 px-2 py-0.5 bg-blue-600 rounded text-xs">Admin</span>}
                            </span>
                            <button
                                onClick={logout}
                                className="text-white/80 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded border border-white/20 hover:border-white/40"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <QuestionProvider>
                        <BrowserRouter>
                            <div>
                                <Navigation />

                                {/* Routes */}
                                <Routes>
                                    <Route path="/" element={<CloudPrepApp/>}/>
                                    <Route path="/login" element={<Login />}/>
                                    <Route path="/register" element={<Register />}/>
                                    <Route 
                                        path="/admin" 
                                        element={
                                            <ProtectedRoute requireAdmin={true}>
                                                <AdminPage/>
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </div>
                        </BrowserRouter>
                    </QuestionProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
