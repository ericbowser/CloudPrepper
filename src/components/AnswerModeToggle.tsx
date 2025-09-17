import React from 'react';
import { AnswerMode } from "../types/preptypes";

interface AnswerModeToggleProps {
    answerMode: AnswerMode;
    setAnswerMode: (mode: AnswerMode) => void;
}

export const AnswerModeToggle: React.FC<AnswerModeToggleProps> = ({
    answerMode,
    setAnswerMode
}) => {

    const handleModeToggle = () => {
        const newMode = answerMode === AnswerMode.inline ? AnswerMode.endOnly : AnswerMode.inline;
        setAnswerMode(newMode);
    };

    return (
        <div className="dark:bg-dark-700 dark:text-white flex items-center justify-center gap-3 mb-8">
            <span className="text-sm font-medium text-white">Answer Mode:</span>
            <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1">
                <button
                    onClick={handleModeToggle}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        answerMode === AnswerMode.inline
                            ? 'bg-white text-blue-600 shadow-md'
                            : 'text-white/80 hover:text-white'
                    }`}
                >
                    {answerMode === AnswerMode.inline ? `📝 Study Mode` : `🎯 Quiz Mode`}
                </button>
            </div>
        </div>
    );
};