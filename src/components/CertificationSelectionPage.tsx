import React from 'react';
import { CertificationData } from '../types/preptypes';

interface CertificationSelectionPageProps {
    certifications: CertificationData[];
    onSelect: (id: 'comptia' | 'aws') => void;
}

export const CertificationSelectionPage: React.FC<CertificationSelectionPageProps> = ({ certifications, onSelect }) => {
    return (
        <main className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    Choose Your Path
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Select a certification to start your preparation journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certifications.map((cert) => (
                    <div key={cert.id} className="bg-white dark:bg-dark-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <div className="p-8">
                            <div className="flex items-center mb-4">
                                <span className="text-4xl mr-4">{cert.icon}</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{cert.name}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.fullName}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Prepare for the {cert.code} exam with {cert.totalQuestions} practice questions across {cert.domains.length} domains.
                            </p>
                            <button
                                onClick={() => onSelect(cert.id)}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Start Studying
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};