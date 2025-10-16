// Admin page for question management - centralized CRUD operations
import React, { useState } from 'react';
import { useQuestions } from '../Question/QuestionContext';
import QuestionManagement from '../Question/QuestionManagement';
import { useQueryClient } from '@tanstack/react-query';

export const AdminPage: React.FC = () => {
    const { stats, isLoading, error } = useQuestions();
    const [selectedCertification, setSelectedCertification] = useState<'comptia' | 'aws'>('comptia');
    const queryClient = useQueryClient();
    const [isClearingCache, setIsClearingCache] = useState(false);

    const handleClearCache = async () => {
        setIsClearingCache(true);
        try {
            // Clear all React Query cache
            await queryClient.clear();

            // Also clear localStorage cache
            localStorage.removeItem('allQuestions');
            localStorage.removeItem('cloudPrepQuizState');

            console.log('Cache cleared successfully');

            // Optionally refetch questions immediately
            await queryClient.invalidateQueries({ queryKey: ['questions'] });
        } catch (error) {
            console.error('Failed to clear cache:', error);
        } finally {
            setIsClearingCache(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Question Management</h1>
                    <p className="text-gray-300">Add, edit, and manage your certification questions</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-gray-300 text-sm mb-1">Total Questions</div>
                        <div className="text-3xl font-bold text-white">{stats.totalQuestions}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-gray-300 text-sm mb-1">CompTIA Questions</div>
                        <div className="text-3xl font-bold text-blue-400">{stats.comptiaTotal}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                        <div className="text-gray-300 text-sm mb-1">AWS Questions</div>
                        <div className="text-3xl font-bold text-orange-400">{stats.awsTotal}</div>
                    </div>
                </div>

                {/* Certification Selector and Cache Controls */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setSelectedCertification('comptia')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                    selectedCertification === 'comptia'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                CompTIA Cloud+
                            </button>
                            <button
                                onClick={() => setSelectedCertification('aws')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                    selectedCertification === 'aws'
                                        ? 'bg-orange-600 text-white shadow-lg'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                AWS Solutions Architect
                            </button>
                        </div>

                        {/* Cache Control Button */}
                        <button
                            onClick={handleClearCache}
                            disabled={isClearingCache}
                            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:opacity-50 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                        >
                            {isClearingCache ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Clearing Cache...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear Cache
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Loading and Error States */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
                        <p className="text-red-200">{error}</p>
                    </div>
                )}

                {/* Question Management Component */}
                {!isLoading && !error && (
                    <QuestionManagement certification={selectedCertification} />
                )}
            </div>
        </div>
    );
};
