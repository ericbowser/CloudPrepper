import React from 'react';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    message,
    action,
    className = ''
}) => {
    return (
        <div className={`text-center py-12 px-4 ${className}`}>
            {icon && (
                <div className="mb-4 flex justify-center">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {message}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;

