import React from 'react';

interface BackdropProps {
    onClick?: () => void;
    className?: string;
    zIndex?: number;
}

export const Backdrop: React.FC<BackdropProps> = ({
    onClick,
    className = '',
    zIndex = 40
}) => {
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm ${className}`}
            style={{ zIndex }}
            onClick={onClick}
            aria-hidden="true"
        />
    );
};

export default Backdrop;

