// src/Theme/ThemeContext.tsx - Updated for 3 themes
import React, {createContext, useContext, useEffect, useState} from 'react';

// Theme type definition
export type ThemeType = 'classic' | 'pastel' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'classic',
    setTheme: (theme: ThemeType): void => {},
});

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeType>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') as ThemeType;
        if (savedTheme && ['classic', 'pastel', 'dark'].includes(savedTheme)) {
            return savedTheme;
        }
        
        // Default to classic (professional) theme
        return 'classic';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove all theme classes
        root.classList.remove('classic', 'pastel', 'dark');
        
        // Add current theme class
        root.classList.add(theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: ThemeType): void => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// New Theme Selector Component
export const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes: { value: ThemeType; label: string; icon: string; description: string }[] = [
        {
            value: 'classic',
            label: 'Classic',
            icon: '📄',
            description: 'Clean white background with black text'
        },
        {
            value: 'pastel',
            label: 'Pastel',
            icon: '🎨',
            description: 'Soft colors for comfortable viewing'
        },
        {
            value: 'dark',
            label: 'Dark',
            icon: '🌙',
            description: 'Dark mode for low-light environments'
        }
    ];

    const currentTheme = themes.find(t => t.value === theme);

    return (
        <div className="relative">
            {/* Theme Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-dark-700 classic:bg-white classic:border classic:border-gray-300 pastel:bg-pastel-mint/60 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Select theme"
            >
                <span className="text-lg">{currentTheme?.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 classic:text-gray-900">
                    {currentTheme?.label}
                </span>
                <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white dark:bg-dark-800 classic:bg-white classic:border classic:border-gray-200 pastel:bg-pastel-bluelight border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                        {themes.map((themeOption) => (
                            <button
                                key={themeOption.value}
                                onClick={() => {
                                    setTheme(themeOption.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 classic:hover:bg-gray-50 pastel:hover:bg-pastel-mint/40 transition-colors ${
                                    theme === themeOption.value
                                        ? 'bg-blue-50 dark:bg-blue-900/20 classic:bg-blue-50 pastel:bg-pastel-blue/30'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{themeOption.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900 dark:text-white classic:text-gray-900">
                                                {themeOption.label}
                                            </span>
                                            {theme === themeOption.value && (
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 classic:text-gray-600 mt-1">
                                            {themeOption.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// Legacy ThemeToggle component - kept for backward compatibility
// You can remove this if you want to fully migrate to ThemeSelector
export const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
        const themeOrder: ThemeType[] = ['classic', 'pastel', 'dark'];
        const currentIndex = themeOrder.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        setTheme(themeOrder[nextIndex]);
    };

    const getIcon = () => {
        switch (theme) {
            case 'classic':
                return '📄';
            case 'pastel':
                return '🎨';
            case 'dark':
                return '🌙';
        }
    };

    return (
        <button
            onClick={cycleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 classic:bg-white classic:border classic:border-gray-300 pastel:bg-pastel-mint/60 text-gray-800 dark:text-gray-200 classic:text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Cycle theme"
            title={`Current: ${theme} - Click to cycle`}
        >
            <span className="text-xl">{getIcon()}</span>
        </button>
    );
};
