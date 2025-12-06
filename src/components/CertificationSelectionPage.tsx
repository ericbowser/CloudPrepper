import React from 'react';
import {CertificationData} from '../types/preptypes';

interface CertificationSelectionPageProps {
    certifications: CertificationData[];
    onSelectCertification: (certId: 'comptia' | 'aws') => void;
}

export const CertificationSelection: React.FC<CertificationSelectionPageProps> = ({certifications, onSelectCertification}) => {
    // Debug: Log certification counts
    React.useEffect(() => {
        certifications.forEach(cert => {
            console.log(`🔍 CertificationSelection: ${cert.name} showing ${cert.totalQuestions} questions`);
        });
    }, [certifications]);

    return (
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                    Choose Your Path
                </h1>
                <p className="mt-2 max-w-md mx-auto text-sm text-gray-500 dark:text-gray-400 sm:text-base md:mt-3 md:text-lg md:max-w-3xl">
                    Select a certification to start your preparation journey.
                </p>
            </div>

            <div className="space-y-4">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        onClick={() => onSelectCertification(cert.id)}
                        className="bg-pastel-mintlight dark:bg-dark-700 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center">
                                <span className="text-4xl mr-4">{cert.icon}</span>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cert.name}</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.fullName}</p>
                                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{cert.totalQuestions} questions
                                        available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};