import React from 'react';
import {Question, UserAnswer} from "../types/preptypes";

const QuizResults: React.FC<{
    userAnswers: UserAnswer[];
    questions: Question[];
    onRestart: () => void;
    onReviewAnswers: () => void;
}> = ({userAnswers, questions, onRestart, onReviewAnswers}) => {
    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const totalTime = userAnswers.reduce((sum, a) => sum + a.timeSpent, 0);
    const avgTimePerQuestion = Math.round(totalTime / totalQuestions / 1000);

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="dark:bg-dark-800 dark:text-white bg-gray-50 min-h-screen max-w-4xl mx-auto">
            {/* Score Overview */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                        <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
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
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onReviewAnswers}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Review Answers
                    </button>
                    <button
                        onClick={onRestart}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold mb-6">Question Breakdown</h3>
                <div className="space-y-4">
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers.find(a => a.questionId === question.question_id);
                        const correctOption = question.options.find(opt => opt.isCorrect);
                        const userSelectedOption = question.options[userAnswer.selectedIndex];

                        return (
                            <div key={question.question_id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="font-medium">Question {index + 1}</span>
                                    <span className={`px-2 py-1 rounded text-sm ${
                                        userAnswer?.isCorrect
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {userAnswer?.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-3">{question.question_text}</p>

                                {!userAnswer?.isCorrect && (
                                    <div className="text-sm space-y-1">
                                        <div className="text-red-600">
                                            Your answer: {userSelectedOption?.text}
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