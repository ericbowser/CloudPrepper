// src/components/QuestionManagement.tsx - Complete CRUD workflow
import React, { useEffect, useState } from 'react';
import { Question } from '../types/preptypes';
import { useQuestions, useQuestionFilters } from '../contexts/QuestionContext';
import AddQuestionForm from './AddQuestionForm';
import EditQuestionForm from './EditQuestionForm';
import QuestionCard from './QuestionCard';

type ViewMode = 'list' | 'add' | 'edit';

interface QuestionManagementProps {
    certification: 'comptia' | 'aws';
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({ certification }) => {
    const {
        addNewQuestion,
        updateExistingQuestion,
        deleteQuestion,
        refreshQuestions,
        stats,
        isSubmitting,
        error,
    } = useQuestions();

    const { filters, setFilter, clearFilters, filteredQuestions } = useQuestionFilters();

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Set certification filter when prop changes
    useEffect(() => {
        setFilter('certification', certification);
    }, [certification, setFilter]);

    // Handle adding new question
    const handleAddQuestion = async (questionData: Question): Promise<void> => {
        try {
            await addNewQuestion(questionData, certification);
            setViewMode('list');
            setSuccessMessage('Question added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    };

    // Handle editing question
    const handleEditQuestion = async (questionId: number, updates: Question, cert: 'comptia' | 'aws') => {
        try {
            await updateExistingQuestion(questionId, updates, cert);
            setViewMode('list');
            setSelectedQuestion(null);
            setSuccessMessage('Question updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to update question:', error);
        }
    };

    // Handle deleting question
    const handleDeleteQuestion = async (question: Question) => {
        if (window.confirm(`Are you sure you want to delete question #${question.question_id}?`)) {
            try {
                await deleteQuestion(question.question_id, certification);
                setSuccessMessage('Question deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Failed to delete question:', error);
            }
        }
    };

    // Start editing a question
    const startEdit = (question: Question) => {
        setSelectedQuestion(question);
        setViewMode('edit');
    };

    // Cancel operations
    const handleCancel = () => {
        setViewMode('list');
        setSelectedQuestion(null);
    };

    // Render different views based on mode
    if (viewMode === 'add') {
        return (
            <AddQuestionForm
                onSubmit={handleAddQuestion}
                onCancel={handleCancel}
                isLoading={isSubmitting}
            />
        );
    }

    if (viewMode === 'edit' && selectedQuestion) {
        return (
            <EditQuestionForm
                question={selectedQuestion}
                onSubmit={handleEditQuestion}
                onCancel={handleCancel}
                isLoading={isSubmitting}
            />
        );
    }

    // Main question list view
    return (
        <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setViewMode('add')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
                >
                    + Add New Question
                </button>
                <button
                    onClick={refreshQuestions}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-colors backdrop-blur-md border border-white/20"
                >
                    ↻ Refresh
                </button>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
                    <p className="text-green-200">{successMessage}</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
                    <p className="text-red-200">{error}</p>
                </div>
            )}

            {/* Search and Filter Bar */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Domain Filter */}
                    <input
                        type="text"
                        placeholder="Filter by domain..."
                        value={filters.domain}
                        onChange={(e) => setFilter('domain', e.target.value)}
                        className="p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-gray-400"
                    />

                    {/* Category Filter */}
                    <input
                        type="text"
                        placeholder="Filter by category..."
                        value={filters.category}
                        onChange={(e) => setFilter('category', e.target.value)}
                        className="p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-gray-400"
                    />

                    {/* Difficulty Filter */}
                    <select
                        value={filters.difficulty}
                        onChange={(e) => setFilter('difficulty', e.target.value)}
                        className="p-3 border border-white/20 rounded-lg bg-white/5 text-white"
                    >
                        <option value="" className="bg-slate-900">All Difficulties</option>
                        <option value="Knowledge" className="bg-slate-900">Knowledge</option>
                        <option value="Comprehension" className="bg-slate-900">Comprehension</option>
                        <option value="Application" className="bg-slate-900">Application</option>
                        <option value="Analysis" className="bg-slate-900">Analysis</option>
                    </select>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={filters.searchText}
                        onChange={(e) => setFilter('searchText', e.target.value)}
                        className="p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-gray-400"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-300">
                        {filteredQuestions.length} questions found
                    </span>
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                {filteredQuestions.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-gray-400 text-lg mb-4">
                            No questions found matching your criteria
                        </p>
                        <button
                            onClick={() => setViewMode('add')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Question
                        </button>
                    </div>
                ) : (
                    filteredQuestions.map((question) => (
                        <QuestionCard
                            key={`${question.question_id}-${question.question_text.substring(0, 20)}`}
                            question={question}
                            onEdit={() => startEdit(question)}
                            onDelete={() => handleDeleteQuestion(question)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestionManagement;
