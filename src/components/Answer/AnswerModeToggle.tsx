import React from 'react';
import { AnswerMode } from "../../types/preptypes";

interface AnswerModeToggleProps {
    answerMode: AnswerMode;
    setAnswerMode: (mode: AnswerMode) => void;
    isFullExamMode?: boolean; // New prop to detect full exam mode
}

export const AnswerModeToggle: React.FC<AnswerModeToggleProps> = ({
    answerMode,
    setAnswerMode,
    isFullExamMode = false
}) => {

    // If it's full exam mode, show a different UI
    if (isFullExamMode) {
        return (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-700 rounded-lg">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                    🏆 Full Exam Simulation
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 p-3 bg-white/80 dark:bg-dark-700 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Explanations:
            </span>
            
            {/* Radio button for inline mode */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-600 px-3 py-2 rounded-md transition-colors">
                <input
                    type="radio"
                    name="explanationMode"
                    checked={answerMode === AnswerMode.inline}
                    onChange={() => setAnswerMode(AnswerMode.inline)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                    📝 Show After Each Question
                </span>
            </label>

            {/* Radio button for end-only mode */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-600 px-3 py-2 rounded-md transition-colors">
                <input
                    type="radio"
                    name="explanationMode"
                    checked={answerMode === AnswerMode.endOnly}
                    onChange={() => setAnswerMode(AnswerMode.endOnly)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                    🎯 Show All at End
                </span>
            </label>
        </div>
    );
};