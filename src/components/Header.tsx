// src/components/Header.tsx - Updated to use ThemeSelector
import React from 'react';
import { ThemeSelector } from "../Theme/ThemeContext";

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
    return (
        <header className="bg-white dark:bg-dark-900 classic:bg-white classic:border-b classic:border-gray-200 pastel:bg-pastel-mint shadow-sm border-b dark:border-gray-700 pastel:border-pastel-border sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white classic:text-gray-900 pastel:text-pastel-text">
                        {title}
                    </h1>
                    <div className="flex items-center space-x-4">
                        {children}
                        <ThemeSelector />
                    </div>
                </div>
            </div>
        </header>
    );
};
