// Admin page for question management - centralized CRUD operations
import React, { useState } from 'react';
import { useQuestions } from '../Question/QuestionContext';
import QuestionManagement from '../Question/QuestionManagement';
import { useQueryClient } from '@tanstack/react-query';

const AdminPage: React.FC = () => {
    const { stats, isLoading, error } = useQuestions();
    const [selectedCertification, setSelectedCertification] = useState<'comptia' | 'aws'>('comptia');
    const queryClient = useQueryClient();
    const [isClearingCache, setIsClearingCache] = useState(false);
    const [cacheCleared, setCacheCleared] = useState(false);

    const handleClearCache = async () => {
        if (!window.confirm('Clear all caches? This will reset all stored data.')) {
            return;
        }
        
        setIsClearingCache(true);
        try {
            // Clear all React Query cache
            queryClient.clear();

            // Clear ALL sessionStorage keys (active session state)
            sessionStorage.removeItem('cloudPrepQuizState');
            sessionStorage.removeItem('react-query-cache'); // Clear React Query cache
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('auth_user');
            // Clear any leftover localStorage items (cleanup only)
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');

            console.log('Cache cleared successfully');
            setCacheCleared(true);
            setTimeout(() => setCacheCleared(false), 3000);

            // Force refetch
            await queryClient.invalidateQueries({ queryKey: ['questions'] });
        } catch (error) {
            console.error('Failed to clear cache:', error);
            alert('Failed to clear cache. Check console for details.');
        } finally {
            setIsClearingCache(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header with Cache Control */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Question Management</h1>
                        <p className="text-gray-300">Add, edit, and manage your certification questions</p>
                    </div>
                    <button
                        onClick={handleClearCache}
                        disabled={isClearingCache}
                        className="px-4 py-2 bg-red-600/20 border border-red-500 text-red-200 rounded-lg hover:bg-red-600/30 disabled:opacity-50 transition-colors"
                    >
                        {isClearingCache ? '⏳ Clearing...' : '🗑️ Clear All Caches'}
                    </button>
                </div>

                {/* Success message */}
                {cacheCleared && (
                    <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                        <p className="text-green-200">✓ All caches cleared successfully!</p>
                    </div>
                )}

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
export default AdminPage
