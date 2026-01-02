import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';
import { ThemeSelector } from '../../contexts/ThemeContext';

interface AdminNavBarProps {
    onNavigateHome?: () => void;
    title?: string;
    showHomeButton?: boolean;
}

export const AdminNavBar: React.FC<AdminNavBarProps> = ({
    onNavigateHome,
    title = 'CompTIA Prepper Admin',
    showHomeButton = true
}) => {
    const { user, logout, isAdmin } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const handleNavigateHome = () => {
        if (onNavigateHome) {
            onNavigateHome();
        } else {
            // Default: clear admin section and go to home
            window.location.href = '/';
        }
    };

    return (
        <nav className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo/Title and Home Button */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⚙️</div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Platform Administration
                                </p>
                            </div>
                        </div>
                        
                        {showHomeButton && (
                            <div className="hidden sm:block ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleNavigateHome}
                                    className="flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Back to Quiz</span>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right: User Menu and Theme */}
                    <div className="flex items-center space-x-4">
                        <ThemeSelector />
                        
                        {isAdmin && (
                            <span className="hidden sm:inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                Admin
                            </span>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user?.username || user?.email?.split('@')[0]}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {user?.email}
                                    </div>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showUserMenu && (
                                <>
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                        
                                        {showHomeButton && (
                                            <button
                                                onClick={() => {
                                                    handleNavigateHome();
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <span>Back to Quiz</span>
                                            </button>
                                        )}
                                        
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setShowUserMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                    
                                    {/* Backdrop to close menu */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavBar;

