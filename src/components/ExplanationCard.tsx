import React from 'react';
import {Question} from "../types/preptypes";

interface ExplanationCardProps {
    question: Question;
    onProceed?: () => void;
    showInModal?: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({question, onProceed, showInModal = false}: ExplanationCardProps)
    : React.ReactElement<any, string | React.JSXElementConstructor<any>> => {

    const explanationContent = (
        <div className="space-y-4">
            {/* Main Explanation */}
            <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2 flex items-center text-base">
                    💡 Explanation
                </h4>
                <p className="dark:text-white text-gray-700 text-sm leading-relaxed">{question.explanation}</p>
            </div>

            {question.explanation_details && (
                <>
                    {/* Breakdown */}
                    <div className="bg-pastel-bluelight dark:bg-white/10 border border-gray-200 dark:border-gray-600 rounded-lg p-4 animate-fade-in">
                        <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2 text-sm">{question.explanation_details.summary}</h5>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                            {question.explanation_details.breakdown.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Why Other Options Are Incorrect - Show directly */}
                    {question.explanation_details.otherOptions && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                            <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-2 flex items-center text-sm">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Why other options are incorrect
                            </h5>
                            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-sm">
                                {question.explanation_details.otherOptions}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );

    if (!showInModal) {
        return (
            <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg animate-fade-in">
                {explanationContent}
            </div>
        );
    }

    return null;
};

export default ExplanationCard;
