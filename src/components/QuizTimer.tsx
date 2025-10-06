import React, { useState, useEffect, useCallback } from 'react';

interface QuizTimerProps {
    duration: number; // Duration in seconds
    onTimeUp: () => void;
    isPaused?: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ duration, onTimeUp, isPaused = false }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        setTimeRemaining(duration);
    }, [duration]);

    useEffect(() => {
        if (isPaused || timeRemaining <= 0) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeRemaining, isPaused, onTimeUp]);

    useEffect(() => {
        // Show warning when 5 minutes (300 seconds) or less remain
        setIsWarning(timeRemaining <= 300 && timeRemaining > 0);
    }, [timeRemaining]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = (): number => {
        return (timeRemaining / duration) * 100;
    };

    const getTimerColor = (): string => {
        if (timeRemaining <= 60) return 'text-red-600 dark:text-red-400';
        if (isWarning) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-blue-600 dark:text-blue-400';
    };

    const getProgressBarColor = (): string => {
        if (timeRemaining <= 60) return 'from-red-500 to-red-600';
        if (isWarning) return 'from-yellow-500 to-yellow-600';
        return 'from-blue-500 to-blue-600';
    };

    return (
        <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg border border-gray-200 dark:border-dark-600 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <svg className={`w-6 h-6 ${getTimerColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Remaining</span>
                </div>
                {isPaused && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        Paused
                    </span>
                )}
            </div>

            <div className={`text-4xl font-bold ${getTimerColor()} mb-4 font-mono text-center`}>
                {formatTime(timeRemaining)}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 shadow-inner overflow-hidden">
                <div
                    className={`h-2 bg-gradient-to-r ${getProgressBarColor()} transition-all duration-1000 ease-linear`}
                    style={{ width: `${getProgressPercentage()}%` }}
                ></div>
            </div>

            {/* Warning Messages */}
            {timeRemaining <= 60 && timeRemaining > 0 && (
                <div className="mt-4 flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg animate-pulse">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Less than 1 minute remaining!
                    </p>
                </div>
            )}
            {isWarning && timeRemaining > 60 && (
                <div className="mt-4 flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        5 minutes remaining
                    </p>
                </div>
            )}
        </div>
    );
};
