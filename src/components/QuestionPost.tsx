// src/components/QuestionManagement.tsx - Complete CRUD workflow
import React, {useState} from 'react';
import {useQuestionFilters, useQuestions} from '../contexts/QuestionContext';
import {Question} from '../types/preptypes';
import AddQuestionForm from './AddQuestionForm';
import EditQuestionForm from './EditQuestionForm';

type ViewMode = 'list' | 'add' | 'edit';

const QuestionManagement: React.FC = () => {
    const {
        addNewQuestion,
        updateExistingQuestion,
        deleteQuestion,
        isSubmitting,
        error,
        stats
    } = useQuestions();

    const {
        filters,
        setFilter,
        clearFilters,
        filteredQuestions
    } = useQuestionFilters();

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Handle adding new question
    const handleAddQuestion = async (questionData: Partial<Question>) => {
        try {
            const certification = questionData.domain?.toLowerCase().includes('aws') ? 'aws' : 'comptia';
            await addQuestion(questionData, certification);
            setViewMode('list');
            setSuccessMessage('Question added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    };

    // Handle editing question
    const handleEditQuestion = async (questionId: number, updates: Question, certification: 'comptia' | 'aws') => {
        try {
            await updateExistingQuestion(questionId, updates, certification);
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
                const certification = question.domain?.toLowerCase().includes('aws') ? 'aws' : 'comptia';
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
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Question Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Manage your certification questions and content
                    </p>
                </div>
                <button
                    onClick={() => setViewMode('add')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
                >
                    <span>+</span>
                    <span>Add New Question</span>
                </button>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">Total Questions</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{stats.totalQuestions}</p>
                </div>

                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">CompTIA Cloud+</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.comptiaTotal}</p>
                </div>

                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200">AWS SAA</h3>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-300">{stats.awsTotal}</p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    {/* Certification Filter */}
                    <select
                        value={filters.certification}
                        onChange={(e) => setFilter('certification', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    >
                        <option value="all">All Certifications</option>
                        <option value="comptia">CompTIA Cloud+</option>
                        <option value="aws">AWS SAA</option>
                    </select>

                    {/* Domain Filter */}
                    <input
                        type="text"
                        placeholder="Filter by domain..."
                        value={filters.domain}
                        onChange={(e) => setFilter('domain', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    />

                    {/* Category Filter */}
                    <input
                        type="text"
                        placeholder="Filter by category..."
                        value={filters.category}
                        onChange={(e) => setFilter('category', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    />

                    {/* Difficulty Filter */}
                    <select
                        value={filters.difficulty}
                        onChange={(e) => setFilter('difficulty', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    >
                        <option value="">All Difficulties</option>
                        <option value="Knowledge">Knowledge</option>
                        <option value="Comprehension">Comprehension</option>
                        <option value="Application">Application</option>
                        <option value="Analysis">Analysis</option>
                    </select>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={filters.searchText}
                        onChange={(e) => setFilter('searchText', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredQuestions.length} questions found
                    </span>

                    <button
                        onClick={clearFilters}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-dark-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No questions found matching your criteria
                        </p>
                        <button
                            onClick={() => setViewMode('add')}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Your First Question
                        </button>
                    </div>
                ) : (
                    filteredQuestions.map((question) => (
                        <QuestionCard
                            key={question.question_id}
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

// Individual Question Card Component
interface QuestionCardProps {
    question: Question;
    onEdit: () => void;
    onDelete: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onEdit, onDelete}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Parse options if they're JSON string
    let options = question.options;
    if (typeof options === 'string') {
        try {
            options = JSON.parse(options);
        } catch (error) {
            options = [];
        }
    }

    const correctAnswers = Array.isArray(options)
        ? options.filter(opt => opt.isCorrect).map(opt => opt.text)
        : [];

    return (
        <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            #{question.question_id}
                        </span>
                        <span
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                            {question.difficulty}
                        </span>
                        <span
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                            {question.multiple_answers ? 'Multi-Select' : 'Single-Select'}
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {question.domain} • {question.category}
                    </h3>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            </div>

            {/* Question Text */}
            <div className="mb-4">
                <p className="text-gray-900 dark:text-white font-medium">
                    {question.question_text}
                </p>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    {/* Options */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Answer Options:</h4>
                        <div className="space-y-1">
                            {Array.isArray(options) && options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded text-sm ${
                                        option.isCorrect
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {option.isCorrect && '✓ '}{option.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Explanation */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Explanation:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {question.explanation}
                        </p>
                    </div>

                    {/* Correct Answer Summary */}
                    <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Correct Answer(s):</h4>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            {correctAnswers.join(', ')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionManagement;