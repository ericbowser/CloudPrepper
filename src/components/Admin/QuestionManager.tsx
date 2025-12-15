// src/components/Admin/QuestionManager.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuestions, addQuestion, updateQuestion } from '../../../api/questions_repository';
import { Question } from '../../types/preptypes';
import AddQuestionForm from './AddQuestionForm';
import EditQuestionForm from './EditQuestionForm';

type ViewMode = 'list' | 'add' | 'edit';
type CertificationFilter = 'all' | 'comptia' | 'aws';

const QuestionManager: React.FC = () => {
    const queryClient = useQueryClient();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [certificationFilter, setCertificationFilter] = useState<CertificationFilter>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch questions
    const { data, isLoading, error } = useQuery({
        queryKey: ['questions'],
        queryFn: getQuestions,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Add question mutation
    const addMutation = useMutation({
        mutationFn: (questionData: any) => addQuestion(questionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
            setViewMode('list');
        },
    });

    // Update question mutation
    const updateMutation = useMutation({
        mutationFn: ({ questionId, questionData }: { questionId: number, questionData: Question, certification: 'comptia' | 'aws' }) => 
            updateQuestion(questionId, questionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
            setViewMode('list');
            setSelectedQuestion(null);
        },
    });

    // Filter questions
    const allQuestions = [
        ...(data?.comptiaQuestions || []).map(q => ({ ...q, certification: 'comptia' as const })),
        ...(data?.awsQuestions || []).map(q => ({ ...q, certification: 'aws' as const })),
    ];

    const filteredQuestions = allQuestions.filter(question => {
        const matchesCert = certificationFilter === 'all' || question.certification === certificationFilter;
        const matchesSearch = searchTerm === '' || 
            question.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.category?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCert && matchesSearch;
    });

    const handleAddQuestion = async (questionData: any): Promise<boolean> => {
        try {
            await addMutation.mutateAsync(questionData);
            return true;
        } catch (error) {
            console.error('Failed to add question:', error);
            return false;
        }
    };

    const handleUpdateQuestion = async (questionId: number, questionData: Question, certification: 'comptia' | 'aws') => {
        try {
            await updateMutation.mutateAsync({ questionId, questionData, certification });
        } catch (error) {
            console.error('Failed to update question:', error);
        }
    };

    const handleEditClick = (question: Question & { certification: 'comptia' | 'aws' }) => {
        setSelectedQuestion(question);
        setViewMode('edit');
    };

    const handleCancelEdit = () => {
        setSelectedQuestion(null);
        setViewMode('list');
    };

    if (viewMode === 'add') {
        return (
            <AddQuestionForm
                onSubmit={handleAddQuestion}
                onCancel={() => setViewMode('list')}
                isLoading={addMutation.isPending}
            />
        );
    }

    if (viewMode === 'edit' && selectedQuestion) {
        return (
            <EditQuestionForm
                question={selectedQuestion}
                onSubmit={handleUpdateQuestion}
                onCancel={handleCancelEdit}
                isLoading={updateMutation.isPending}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Question Manager
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {filteredQuestions.length} questions {certificationFilter !== 'all' && `(${certificationFilter.toUpperCase()})`}
                        </p>
                    </div>
                    <button
                        onClick={() => setViewMode('add')}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add New Question</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCertificationFilter('all')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                certificationFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setCertificationFilter('comptia')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                certificationFilter === 'comptia'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            CompTIA
                        </button>
                        <button
                            onClick={() => setCertificationFilter('aws')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                certificationFilter === 'aws'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            AWS
                        </button>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading questions...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center">
                        <div className="text-red-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Failed to load questions</p>
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">No questions found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredQuestions.map((question, index) => {
                            // Create unique key combining certification and question_id
                            const uniqueKey = `${question.certification}-${question.question_id || index}`;
                            
                            return (
                            <div key={uniqueKey} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                                question.certification === 'comptia'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
                                            }`}>
                                                {question.certification?.toUpperCase()}
                                            </span>
                                            <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 rounded">
                                                {question.domain}
                                            </span>
                                            <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded">
                                                {question.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-medium mb-2 line-clamp-2">
                                            {question.question_text}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {question.category}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleEditClick(question as Question & { certification: 'comptia' | 'aws' })}
                                        className="ml-4 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionManager;
