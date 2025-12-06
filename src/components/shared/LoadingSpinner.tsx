import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text,
    fullScreen = false,
    className = ''
}) => {
    const spinner = (
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} ${className}`} />
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="text-center">
                    {spinner}
                    {text && <p className="mt-4 text-gray-600">{text}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {spinner}
            {text && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;

