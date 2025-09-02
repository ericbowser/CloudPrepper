import React from 'react';
import {Question} from "../types/preptypes";

interface ExplanationCardProps {
    question: Question;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({question}: ExplanationCardProps)
    : React.ReactElement<any, string | React.JSXElementConstructor<any>> => {

    return (
        <div
            className="explanation-card animate-fade-in">
            <h4>
                💡 Explanation
            </h4>
            <p className="mb-4">{question.explanation}</p>

            {question.explanationDetails && (
                <>
                    <div className="mb-4">
                        <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">{question.explanationDetails.summary}</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            {question.explanationDetails.breakdown.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/50 p-3 rounded">
                        <strong>Why other options are incorrect:</strong>
                        <div className="mt-1 whitespace-pre-line">{question.explanationDetails.otherOptions}</div>
                    </div>
                </>
            )}
        </div>)
};

export default ExplanationCard;