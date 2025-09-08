import React from 'react';
import {ThemeToggle} from "../contexts/ThemeContext";

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
    return (
        <header className="bg-white dark:bg-dark-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <div className="flex items-center space-x-4">
                        {children}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};