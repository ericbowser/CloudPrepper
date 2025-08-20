import React from 'react';
import {Question} from "../types/preptypes";

interface ExplanationCardProps {
    question: Question;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({question}: ExplanationCardProps)
    : React.ReactElement<any, string | React.JSXElementConstructor<any>> => {

    return (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-in">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-lg">
                💡 Explanation
            </h4>
            <p className="text-gray-700 mb-4">{question.explanation}</p>

            {question.explanation_details && (
                <>
                    <div className="mb-4">
                        <h5 className="font-medium text-blue-700 mb-2">{question.explanation_details.summary}</h5>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {question.explanation_details.breakdown.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <strong>Why other options are incorrect:</strong>
                        <div className="mt-1 whitespace-pre-line">{question.explanation_details.otherOptions}</div>
                    </div>
                </>
            )}
        </div>)
};

export default ExplanationCard;