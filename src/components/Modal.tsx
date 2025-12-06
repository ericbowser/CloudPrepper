import React from 'react';
import { Backdrop } from './shared/Backdrop';
import { Button } from './shared/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    showFooter?: boolean;
    footerActions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children,
    showFooter = true,
    footerActions
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Backdrop onClick={onClose} zIndex={40} />

            {/* Modal Content */}
            <div className="relative bg-pastel-mintlight dark:bg-dark-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden border border-gray-200 dark:border-gray-600 animate-fade-in z-50">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
                    {children}
                </div>

                {/* Footer */}
                {showFooter && (
                    <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-600">
                        {footerActions || (
                            <Button onClick={onClose}>
                                Close
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
