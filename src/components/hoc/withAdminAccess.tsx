import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { EmptyState } from '../shared/EmptyState';

/**
 * Higher-Order Component that wraps a component with admin access check
 * @param Component - The component to wrap
 * @param fallback - Optional custom fallback component to show if not admin
 */
export function withAdminAccess<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: React.ComponentType
) {
    return function AdminProtectedComponent(props: P) {
        const { isAdmin, loading } = useAuth();

        if (loading) {
            return <LoadingSpinner fullScreen text="Loading..." />;
        }

        if (!isAdmin) {
            if (fallback) {
                return <fallback />;
            }

            return (
                <EmptyState
                    icon={
                        <svg
                            className="w-16 h-16 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    }
                    title="Access Denied"
                    message="You don't have permission to access this page. Admin access is required."
                    action={{
                        label: 'Go Back',
                        onClick: () => window.history.back()
                    }}
                />
            );
        }

        return <Component {...props} />;
    };
}

