import React from 'react';
import {AnswerRecord, Question} from "../types/preptypes";

const QuizResults: React.FC<{
    userAnswers: AnswerRecord[] | null;
    questions: Question[];
    onRestart: () => void;
}> = ({userAnswers, questions, onRestart}) => {
    const totalQuestions = questions.length;
    if (!userAnswers || userAnswers.length === 0) return null;

    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = userAnswers.reduce((sum, a) => sum + a.timeSpent, 0);
    const avgTimePerQuestion = Math.round(totalTime / totalQuestions / 1000);

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const printStyles = `
    @media print {
        body {
            font-family: sans-serif;
        }
        .print\:hidden {
            display: none;
        }
        .dark\:bg-dark-800, .dark\:bg-dark-900, .bg-white\/10 {
            background-color: transparent !important;
        }
        .dark\:text-white {
            color: #000 !important;
        }
        .shadow-xl {
            box-shadow: none !important;
        }
        .border-white\/20 {
            border: 1px solid #ccc !important;
        }
        .break-inside-avoid {
            break-inside: avoid;
        }
    }
    `;

    return (
        <div className="dark:bg-dark-800 dark:text-white bg-pastel-cyan min-h-screen max-w-4xl mx-auto">
            <style>{printStyles}</style>
            {/* Score Overview */}
            <div className="dark:bg-dark-800 dark:text-white bg-pastel-mintlight backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(accuracy)}`}>
                        {accuracy}%
                    </div>
                    <p className="dark:text-gray-200 text-gray-600 text-sm">
                        {correctAnswers} out of {totalQuestions} questions correct
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="dark:bg-dark-800 dark:text-white grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="dark:bg-dark-800 dark:text-white text-center p-4 bg-pastel-blue rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                        <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="text-center p-4 bg-pastel-cream rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{avgTimePerQuestion}s</div>
                        <div className="text-sm text-gray-600">Avg Time/Question</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.round(totalTime / 1000 / 60)}m
                        </div>
                        <div className="text-sm text-gray-600">Total Time</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="dark:bg-dark-800 dark:text-white bg-pastel-mintlight backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 flex justify-center gap-4 print:hidden">
                    <button
                        onClick={onRestart}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Retake Quiz
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Print Results
                    </button>
                </div>
            </div>

            {/* Detailed Results */}
            <div className="dark:bg-dark-900 dark:text-white/10 bg-pastel-mintlight backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="dark:text-white dark:bold text-xl font-bold mb-6">Question Breakdown</h3>
                <div className="space-y-4">
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers.find(a => a.questionId === question.question_id);
                        const correctOption = question.options.find(opt => opt.isCorrect);
                        if (!userAnswer) return null;

                        return (
                            <div key={question.question_id} className="dark:bg-dark-800 dark:text-white bg-pastel-bluelight border border-gray-200 rounded-lg p-4 break-inside-avoid">
                                <div className="flex flex-row items-start justify-between mb-2">
                                    <span className="font-medium">Question {index + 1}</span>
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        userAnswer?.isCorrect
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {userAnswer?.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>
                                <p className="mb-3">{question.question_text}</p>

                                {!userAnswer?.isCorrect && (
                                    <div className="dark:text-white dark:bg-dark-800 dark:bolder text-sm space-y-1">
                                        <div className="text-red-600">
                                            Your answer: {userAnswer.selectedAnswers.join(', ')}
                                        </div>
                                        <div className="text-green-600">
                                            Correct answer: {correctOption?.text}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResults;