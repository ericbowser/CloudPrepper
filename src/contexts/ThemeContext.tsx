// src/contexts/ThemeContext.jsx
import React, {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext("dark");

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(true);

    // Check localStorage and system preference on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        } else {
            setIsDark(prefersDark);
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};