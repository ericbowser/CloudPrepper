import {QUESTIONS} from "../QuestionRepository/AWS_Certified_Architect_Associate_Questions";
import {QUESTIONS} from "../QuestionRepository/CompTIA_Cloud_Plus_Questions";
import {Question} from "../types/preptypes";
// Helper functions for question management
export const getQuestionsByDomain = (domain: string): Question[] => {
    return QUESTIONS.filter(q => q.domain === domain);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
    return QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): Question[] => {
    return QUESTIONS.filter(q => q.category.includes(category));
};

export const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Statistics for dashboard
export const getQuestionStats = () => {
    const domains = [...new Set(QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(QUESTIONS.map(q => q.difficulty))];
    const categories = [...new Set(QUESTIONS.map(q => q.category))];

    return {
        total: QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: QUESTIONS.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        categories: categories.length
    };
};
