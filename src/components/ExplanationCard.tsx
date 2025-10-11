import React, {useState} from 'react';
import {Question} from "../types/preptypes";
import Modal from "./Modal";

interface ExplanationCardProps {
    question: Question;
    onProceed?: () => void;
    showInModal?: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({question, onProceed, showInModal = false}: ExplanationCardProps)
    : React.ReactElement<any, string | React.JSXElementConstructor<any>> => {

    const [isOtherOptionsModalOpen, setIsOtherOptionsModalOpen] = useState(false);

    const explanationContent = (
        <>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-3 flex items-center text-lg">
                💡 Explanation
            </h4>
            <p className="dark:text-white dark:bolder text-gray-700 mb-4">{question.explanation}</p>

            {question.explanation_details && (
                <>
                    <div className="mt-6 bg-pastel-bluelight dark:bg-white/10 border border-gray-200 dark:border-gray-600 rounded-lg p-6 animate-fade-in mb-4">
                        <h5 className="dark:text-white dark:bolder font-medium text-blue-700 dark:text-blue-400 mb-2">{question.explanation_details.summary}</h5>
                        <ul className="dark:text-white dark:bolder list-disc pl-5 text-gray-700 space-y-1">
                            {question.explanation_details.breakdown.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {question.explanation_details.otherOptions && (
                        <div className="mt-4">
                            <button
                                onClick={() => setIsOtherOptionsModalOpen(true)}
                                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Why other options are incorrect
                            </button>

                            <Modal
                                isOpen={isOtherOptionsModalOpen}
                                onClose={() => setIsOtherOptionsModalOpen(false)}
                                title="Why other options are incorrect"
                            >
                                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {question.explanation_details.otherOptions}
                                </div>
                            </Modal>
                        </div>
                    )}
                </>
            )}
        </>
    );

    if (!showInModal) {
        return (
            <div
                className="dark:bg-dark-800 decoration-amber-200 dark:text-white  mt-6 bg-pastel-mintlight dark:bg-white/10 border dark:border-white rounded-lg p-6 animate-fade-in">
                {explanationContent}
            </div>
        );
    }

    return null;
};

export default ExplanationCard;