// src/helpers/utils.ts - Updated for PostgreSQL integration
import {Question} from "../types/preptypes";

export const getQuestionsByDomain = (questions: Question[], domain: string): Question[] => {
    const filtered = questions.filter(q => q.domain.toLowerCase().includes(domain.toLowerCase()));
    console.log(`Filtered ${filtered.length} questions by domain: ${domain}`);
    return filtered;
};

export const getRandomQuestions = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    console.log(`Selected ${Math.min(count, shuffled.length)} random questions from ${questions.length} total`);
    return shuffled.slice(0, count);
};

export const shuffleQuestions = (questions: Question[]): Question[] => {
    return [...questions].sort(() => 0.5 - Math.random());
};

// Statistics for dashboard
export const getQuestionStats = (questions: Question[]) => {
    const domains = [...new Set(questions.map(q => q.domain))];
    const difficulties = [...new Set(questions.map(q => q.difficulty))];
    const categories = [...new Set(questions.map(q => q.category))];

    console.log(`Question stats: ${questions.length} total, ${domains.length} domains, ${difficulties.length} difficulties, ${categories.length} categories`);

    return {
        total: questions.length,
        byDomain: domains.map(domain => ({
            domain,
            count: questions.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: questions.filter(q => q.difficulty === difficulty).length
        })),
        byCategory: categories.map(category => ({
            category,
            count: questions.filter(q => q.category === category).length
        })),
        domains: domains.length,
        difficulties: difficulties.length,
        categories: categories.length
    };
};

// Combine questions from multiple certifications
export const combineQuestions = (...questionArrays: Question[][]): Question[] => {
    const combined = questionArrays.flat();
    console.log(`Combined ${combined.length} questions from ${questionArrays.length} sources`);
    return combined;
};

// Search questions by text content
export const searchQuestions = (questions: Question[], searchTerm: string): Question[] => {
    const term = searchTerm.toLowerCase();
    const filtered = questions.filter(q =>
        q.question_text.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        q.domain.toLowerCase().includes(term) ||
        q.explanation.toLowerCase().includes(term) ||
        q.options.some(option => option.text.toLowerCase().includes(term))
    );

    console.log(`Found ${filtered.length} questions matching search term: ${searchTerm}`);
    return filtered;
};

// Helper to format question for display
export const formatQuestionForDisplay = (question: Question): Question => {
    return {
        ...question,
        isCurrentQuestion: false,
        onClick: () => console.log(`Question ${question.id} clicked`)
    };
};

// Validate question structure
export const validateQuestion = (question: any): question is Question => {
    return (
        question &&
        typeof question.id !== 'undefined' &&
        typeof question.question === 'string' &&
        Array.isArray(question.options) &&
        question.options.length > 0 &&
        typeof question.correctAnswer === 'string' &&
        typeof question.explanation === 'string'
    );
};

// Filter valid questions from array
export const filterValidQuestions = (questions: any[]): Question[] => {
    const valid = questions.filter(validateQuestion);
    console.log(`Filtered ${valid.length} valid questions from ${questions.length} total`);
    return valid;
};