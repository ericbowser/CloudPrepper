import React, { useState } from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/output.css';
import {ThemeProvider} from "./contexts/ThemeContext";
import CloudPrepApp from "../src/App";
import {QuestionProvider} from "./contexts/QuestionContext";
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from './data/queryClient';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import AdminPage from './components/pages/AdminPage';
import {AuthProvider, useAuth} from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ExtractImageText from './components/Admin/ExtractImageText';
import {initSentry} from "./config/sentry";
// Initialize Sentry BEFORE React renders
initSentry();
  
// Navigation component (needs to be inside AuthProvider to use useAuth)
const Navigation = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const [showOcrModal, setShowOcrModal] = React.useState(false);
    const location = window.location;

    // Determine if we're on the quiz page (main route)
    const isOnQuizPage = location.pathname === '/';

    return (
        <>
            <nav className="bg-gradient-to-r from-slate-900 to-purple-900 border-b border-white/10">
                <div className="mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <Link
                            to="/"
                            className="text-white hover:text-blue-300 transition-colors font-medium"
                        >
                            Quiz
                        </Link>
                        
                        {/* Admin Tools - Only show when on quiz page AND user is admin */}
                        {isAdmin && isOnQuizPage && (
                            <div className="flex gap-3 ml-4 pl-4 border-l border-white/20">
                                <button
                                    onClick={() => {
                                        // Trigger admin section in CloudPrepApp
                                        window.dispatchEvent(new CustomEvent('navigateToAdmin'));
                                    }}
                                    className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-200 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Admin Panel
                                </button>
                                <button
                                    onClick={() => setShowOcrModal(true)}
                                    className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-200 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    OCR Tool
                                </button>
                            </div>
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
            
            {/* OCR Modal */}
            {showOcrModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="relative bg-white dark:bg-dark-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-purple-900 px-6 py-4 flex justify-between items-center border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">OCR Text Extraction</h2>
                            <button
                                onClick={() => setShowOcrModal(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            <ExtractImageText />
                        </div>
                    </div>
                </div>
            )}
        </>
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
