import React, {useEffect, useState} from 'react';
import {AnswerMode} from "../types/preptypes";

interface AnswerModeToggleProps {
    handleAnswerMode: (mode: AnswerMode) => void;
    answerMode: AnswerMode;
    setAnswerMode: (mode: number) => void;
}

export const AnswerModeToggle: React.FC<AnswerModeToggleProps> = ({
                                                                      handleAnswerMode,
                                                                      answerMode,
                                                                      setAnswerMode
                                                                  }: AnswerModeToggleProps): React.ReactNode => {

    const [mode, setMode] = useState<AnswerMode | string>(answerMode | AnswerMode.inline);

    useEffect(() => {
        console.log("Mode and parent answer mode:", mode, answerMode);
    }, [mode]);

    const handleAnswerModeClick = (handleAnswerMode: React.MouseEvent<HTMLButtonElement>) => {
        console.log("handleAnswerModeClick called with mode:", handleAnswerMode)
        handleAnswerMode.currentTarget.click();
        if (answerMode === AnswerMode.inline) {
            setAnswerMode(AnswerMode.endOnly);
            setMode(AnswerMode.endOnly);
        } else {
            setAnswerMode(AnswerMode.inline);
            setMode(AnswerMode.inline);
        }
    }

    return (
        <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-sm font-medium text-white">Answer Mode:</span>
            <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1">
                <button
                    onClick={(handleAnswerMode) => handleAnswerModeClick(handleAnswerMode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        mode === 'inline'
                            ? 'bg-white text-blue-600 shadow-md'
                            : 'text-white/80 hover:text-white'
                    }`}
                >
                    {mode === 'quiz' ? `🎯 Quiz Mode` : `📝  Study Mode`}
                </button>
                {/* <button
                    onClick={() => setAnswerMode('end-only')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        answerMode === 'end-only'
                            ? 'bg-white text-blue-600 shadow-md'
                            : 'text-white/80 hover:text-white'
                    }`}
                >
                     Quiz Mode
                </button>*/}
            </div>
        </div>
    );
};