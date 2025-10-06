import {Question} from "./types/preptypes";
import React, {useState} from "react";

interface QuestionCardProps {
    question: Question;
    onEdit: () => void;
    onDelete: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onEdit, onDelete}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Parse options if they're JSON string
    let options = question.options;
    if (typeof options === 'string') {
        try {
            options = JSON.parse(options);
        } catch (error) {
            options = [];
        }
    }

    const correctAnswers = Array.isArray(options)
        ? options.filter(opt => opt.isCorrect).map(opt => opt.text)
        : [];

    return (
        <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            #{question.question_id}
                        </span>
                        <span
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                            {question.difficulty}
                        </span>
                        <span
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                            {question.multiple_answers ? 'Multi-Select' : 'Single-Select'}
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {question.domain} • {question.category}
                    </h3>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>

            {/* Question Text */}
            <div className="mb-4">
                <p className="text-gray-900 dark:text-white font-medium">
                    {question.question_text}
                </p>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    {/* Options */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Answer Options:</h4>
                        <div className="space-y-1">
                            {Array.isArray(options) && options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded text-sm ${
                                        option.isCorrect
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {option.isCorrect && '✓ '}{option.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Explanation */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Explanation:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {question.explanation}
                        </p>
                    </div>

                    {/* Correct Answer Summary */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Correct Answer(s):</h4>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            {correctAnswers.join(', ')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default QuestionCard;
