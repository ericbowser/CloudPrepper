import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    variant?: 'default' | 'mint' | 'aqua' | 'cream';
}

const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
};

const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700',
    mint: 'bg-pastel-mintlight dark:bg-dark-700 border border-gray-200 dark:border-gray-600',
    aqua: 'bg-pastel-aqua dark:bg-dark-900 border border-gray-200 dark:border-gray-600',
    cream: 'bg-pastel-cream dark:bg-dark-900 border border-gray-200 dark:border-gray-600'
};

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    variant = 'default'
}) => {
    const paddingClass = paddingClasses[padding];
    const variantClass = variantClasses[variant];
    const baseClasses = 'rounded-lg shadow-sm';

    return (
        <div className={`${baseClasses} ${variantClass} ${paddingClass} ${className}`}>
            {children}
        </div>
    );
};

export default Card;

