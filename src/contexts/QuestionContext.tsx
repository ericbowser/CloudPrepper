// src/context/QuestionContext.tsx
import React, {createContext, useCallback, useContext, useEffect, useReducer} from 'react';
import {CertificationData, Question} from '../types/preptypes';
import {CERTIFICATIONS} from '../config/domainConfig';
import {addQuestion, getQuestions, updateQuestion} from '../../api/questions_repository';

// Types for the context
interface QuestionState {
    // Question data
    comptiaQuestions: Question[];
    awsQuestions: Question[];

    // Loading states
    isLoading: boolean;
    isSubmitting: boolean;

    // Error handling
    error: string | null;

    // Filters and search
    filters: {
        certification: 'comptia' | 'aws' | 'all';
        domain: string;
        category: string;
        difficulty: string;
        searchText: string;
    };

    // Cached certifications with populated questions
    certifications: CertificationData[];

    // Statistics
    stats: {
        totalQuestions: number;
        comptiaTotal: number;
        awsTotal: number;
        lastUpdated: Date | null;
    };
}

interface QuestionContextType extends QuestionState {
    // Question CRUD operations
    addNewQuestion: (question: Question, certification: 'comptia' | 'aws') => Promise<Question>;
    updateExistingQuestion: (questionId: number, updates: Question, certification: 'comptia' | 'aws') => Promise<Question>;
    deleteQuestion: (questionId: number, certification: 'comptia' | 'aws') => Promise<void>;

    // Data fetching
    fetchQuestions: () => Promise<void>;
    refreshQuestions: () => Promise<void>;

    // Filtering and search
    setFilter: (filterType: keyof QuestionState['filters'], value: string) => void;
    clearFilters: () => void;
    getFilteredQuestions: () => Question[];

    // Utility functions
    getQuestionById: (questionId: number, certification: 'comptia' | 'aws') => Question | null;
    getQuestionsByDomain: (domainId: string, certification: 'comptia' | 'aws') => Question[];
    getQuestionsByCategory: (category: string, certification: 'comptia' | 'aws') => Question[];

    // Statistics
    getStatsByDomain: (certification: 'comptia' | 'aws') => Array<{
        domain: string;
        count: number;
        percentage: number
    }>;
    getStatsByDifficulty: (certification: 'comptia' | 'aws') => Array<{ difficulty: string; count: number }>;
}

// Action types for reducer
type QuestionAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_SUBMITTING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_QUESTIONS'; payload: { comptiaQuestions: Question[]; awsQuestions: Question[] } }
    | { type: 'ADD_QUESTION'; payload: { question: Question; certification: 'comptia' | 'aws' } }
    | { type: 'UPDATE_QUESTION'; payload: { question: Question; certification: 'comptia' | 'aws' } }
    | { type: 'DELETE_QUESTION'; payload: { questionId: number; certification: 'comptia' | 'aws' } }
    | { type: 'SET_FILTER'; payload: { filterType: keyof QuestionState['filters']; value: string } }
    | { type: 'CLEAR_FILTERS' };

// Initial state
const initialState: QuestionState = {
    comptiaQuestions: [],
    awsQuestions: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    filters: {
        certification: 'all',
        domain: '',
        category: '',
        difficulty: '',
        searchText: ''
    },
    certifications: CERTIFICATIONS,
    stats: {
        totalQuestions: 0,
        comptiaTotal: 0,
        awsTotal: 0,
        lastUpdated: null
    }
};

// Reducer function
const questionReducer = (state: QuestionState, action: QuestionAction): QuestionState => {
    switch (action.type) {
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};

        case 'SET_SUBMITTING':
            return {...state, isSubmitting: action.payload};

        case 'SET_ERROR':
            return {...state, error: action.payload, isLoading: false, isSubmitting: false};

        case 'SET_QUESTIONS': {
            const {comptiaQuestions, awsQuestions} = action.payload;
            return {
                ...state,
                comptiaQuestions,
                awsQuestions,
                isLoading: false,
                error: null,
                stats: {
                    totalQuestions: comptiaQuestions.length + awsQuestions.length,
                    comptiaTotal: comptiaQuestions.length,
                    awsTotal: awsQuestions.length,
                    lastUpdated: new Date()
                }
            };
        }

        case 'ADD_QUESTION': {
            const {question, certification} = action.payload;
            const newState = certification === 'comptia'
                ? {...state, comptiaQuestions: [...state.comptiaQuestions, question]}
                : {...state, awsQuestions: [...state.awsQuestions, question]};

            return {
                ...newState,
                isSubmitting: false,
                stats: {
                    ...newState.stats,
                    totalQuestions: newState.comptiaQuestions.length + newState.awsQuestions.length,
                    comptiaTotal: newState.comptiaQuestions.length,
                    awsTotal: newState.awsQuestions.length,
                    lastUpdated: new Date()
                }
            };
        }

        case 'UPDATE_QUESTION': {
            const {question, certification} = action.payload;
            const updateQuestions = (questions: Question[]) =>
                questions.map(q => q.question_id === question.question_id ? question : q);

            return certification === 'comptia'
                ? {...state, comptiaQuestions: updateQuestions(state.comptiaQuestions), isSubmitting: false}
                : {...state, awsQuestions: updateQuestions(state.awsQuestions), isSubmitting: false};
        }

        case 'DELETE_QUESTION': {
            const {questionId, certification} = action.payload;
            const filterQuestions = (questions: Question[]) =>
                questions.filter(q => q.question_id !== questionId);

            const newState = certification === 'comptia'
                ? {...state, comptiaQuestions: filterQuestions(state.comptiaQuestions)}
                : {...state, awsQuestions: filterQuestions(state.awsQuestions)};

            return {
                ...newState,
                stats: {
                    ...newState.stats,
                    totalQuestions: newState.comptiaQuestions.length + newState.awsQuestions.length,
                    comptiaTotal: newState.comptiaQuestions.length,
                    awsTotal: newState.awsQuestions.length,
                    lastUpdated: new Date()
                }
            };
        }

        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: action.payload.value
                }
            };

        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: initialState.filters
            };

        default:
            return state;
    }
};

// Create context
const QuestionContext = createContext<QuestionContextType | null>(null);

// Provider component
export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(questionReducer, initialState);

    // API call functions
    const fetchQuestions = useCallback(async () => {
        dispatch({type: 'SET_LOADING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});

        try {
            const response = await getQuestions();
            dispatch({
                type: 'SET_QUESTIONS',
                payload: {
                    comptiaQuestions: response.comptiaQuestions || [],
                    awsQuestions: response.awsQuestions || []
                }
            });
        } catch (error) {
            console.error('Error fetching questions:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to fetch questions'
            });
        }
    }, []);

    const addNewQuestion = useCallback(async (questionData: Question, certification: 'comptia' | 'aws'): Promise<Question> => {
        dispatch({type: 'SET_SUBMITTING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});

        try {
            const response = await addQuestion(questionData);

            if (response === null || response === undefined) {
                throw new Error('HTTP error adding a new question.');
            }

            const newQuestion = result.question;

            dispatch({
                type: 'ADD_QUESTION',
                payload: {question: newQuestion, certification}
            });

            return newQuestion;
        } catch (error) {
            console.error('Error adding question:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to add question'
            });
            throw error;
        }
    }, []);

    const updateExistingQuestion = useCallback(async (questionId: number, updates: Question, certification: 'comptia' | 'aws'): Promise<Question> => {
        dispatch({type: 'SET_SUBMITTING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});

        try {
            const updateData = {
                ...updates,
                certification: certification
            }
            const response = await updateQuestion(questionId, updateData);
            console.log(response);

            if (!response.ok) {
                throw new Error('HTTP error! status');
            }

            const updatedQuestion = response.question;

            dispatch({
                type: 'UPDATE_QUESTION',
                payload: {question: updatedQuestion, certification}
            });

            return updatedQuestion;
        } catch (error) {
            console.error('Error updating question:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to update question'
            });
            throw error;
        }
    }, []);

    const deleteQuestion = useCallback(async (questionId: number, certification: 'comptia' | 'aws'): Promise<void> => {
        dispatch({type: 'SET_SUBMITTING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});

        try {
            const response = await fetch(`/api/questions/${questionId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({certification})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            dispatch({
                type: 'DELETE_QUESTION',
                payload: {questionId, certification}
            });
        } catch (error) {
            console.error('Error deleting question:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to delete question'
            });
            throw error;
        }
    }, []);

    const refreshQuestions = useCallback(() => fetchQuestions(), [fetchQuestions]);

    // Filter and search functions
    const setFilter = useCallback((filterType: keyof QuestionState['filters'], value: string) => {
        dispatch({type: 'SET_FILTER', payload: {filterType, value}});
    }, []);

    const clearFilters = useCallback(() => {
        dispatch({type: 'CLEAR_FILTERS'});
    }, []);

    const getFilteredQuestions = useCallback((): Question[] => {
        let questions: Question[] = [];

        // Select questions based on certification filter
        if (state.filters.certification === 'comptia') {
            questions = state.comptiaQuestions;
        } else if (state.filters.certification === 'aws') {
            questions = state.awsQuestions;
        } else {
            questions = [...state.comptiaQuestions, ...state.awsQuestions];
        }

        // Apply filters

        return questions.filter(question => {

            const matchesDomain = !state.filters.domain || question.domain.toLowerCase().includes(state.filters.domain.toLowerCase());
            const matchesCategory = !state.filters.category || question.category.toLowerCase().includes(state.filters.category.toLowerCase());
            const matchesDifficulty = !state.filters.difficulty || question.difficulty === state.filters.difficulty;
            const matchesSearch = !state.filters.searchText ||
                question.question_text.toLowerCase().includes(state.filters.searchText.toLowerCase()) ||
                question.category.toLowerCase().includes(state.filters.searchText.toLowerCase());

            return matchesDomain && matchesCategory && matchesDifficulty && matchesSearch;
        });
    }, [state.comptiaQuestions, state.awsQuestions, state.filters]);

    // Utility functions
    const getQuestionById = useCallback((questionId: number, certification: 'comptia' | 'aws'): Question | null => {
        const questions = certification === 'comptia' ? state.comptiaQuestions : state.awsQuestions;
        return questions.find(q => q.question_id === questionId) || null;
    }, [state.comptiaQuestions, state.awsQuestions]);

    const getQuestionsByDomain = useCallback((domainId: string, certification: 'comptia' | 'aws'): Question[] => {
        const questions = certification === 'comptia' ? state.comptiaQuestions : state.awsQuestions;
        return questions.filter(q => q.domain.toLowerCase().includes(domainId.toLowerCase()));
    }, [state.comptiaQuestions, state.awsQuestions]);

    const getQuestionsByCategory = useCallback((category: string, certification: 'comptia' | 'aws'): Question[] => {
        const questions = certification === 'comptia' ? state.comptiaQuestions : state.awsQuestions;
        return questions.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));
    }, [state.comptiaQuestions, state.awsQuestions]);

    // Statistics functions
    const getStatsByDomain = useCallback((certification: 'comptia' | 'aws') => {
        const questions = certification === 'comptia' ? state.comptiaQuestions : state.awsQuestions;
        const domainCounts: Record<string, number> = {};

        questions.forEach(q => {
            domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
        });

        return Object.entries(domainCounts).map(([domain, count]) => ({
            domain,
            count,
            percentage: Math.round((count / questions.length) * 100)
        })).sort((a, b) => b.count - a.count);
    }, [state.comptiaQuestions, state.awsQuestions]);

    const getStatsByDifficulty = useCallback((certification: 'comptia' | 'aws') => {
        const questions = certification === 'comptia' ? state.comptiaQuestions : state.awsQuestions;
        const difficultyCounts: Record<string, number> = {};

        questions.forEach(q => {
            difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
        });

        return Object.entries(difficultyCounts).map(([difficulty, count]) => ({
            difficulty,
            count
        })).sort((a, b) => b.count - a.count);
    }, [state.comptiaQuestions, state.awsQuestions]);

    // Load questions on mount
    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const contextValue: QuestionContextType = {
        ...state,

        // CRUD operations
        addNewQuestion,
        updateExistingQuestion,
        deleteQuestion,

        // Data fetching
        fetchQuestions,
        refreshQuestions,

        // Filtering and search
        setFilter,
        clearFilters,
        getFilteredQuestions,

        // Utility functions
        getQuestionById,
        getQuestionsByDomain,
        getQuestionsByCategory,

        // Statistics
        getStatsByDomain,
        getStatsByDifficulty
    };

    return (
        <QuestionContext.Provider value={contextValue}>
            {children}
        </QuestionContext.Provider>
    );
};

// Custom hook for using the context
export const useQuestions = (): QuestionContextType => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestions must be used within a QuestionProvider');
    }
    return context;
};

// Additional convenience hooks
export const useQuestionStats = (certification?: 'comptia' | 'aws') => {
    const {stats, getStatsByDomain, getStatsByDifficulty} = useQuestions();

    return {
        totalStats: stats,
        domainStats: certification ? getStatsByDomain(certification) : null,
        difficultyStats: certification ? getStatsByDifficulty(certification) : null
    };
};

export const useQuestionFilters = () => {
    const {filters, setFilter, clearFilters, getFilteredQuestions} = useQuestions();

    return {
        filters,
        setFilter,
        clearFilters,
        filteredQuestions: getFilteredQuestions()
    };
};

export default QuestionContext;