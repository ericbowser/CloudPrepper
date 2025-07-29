import {AWS_QUESTIONS} from "../QuestionRepository/AWS_Certified_Architect_Associate_Questions";
import {COMPTIA_QUESTIONS} from "../QuestionRepository/CompTIA_Cloud_Plus_Questions";
import {Question} from "../types/preptypes";
// Helper functions for question management
export const getAwsQuestionsByDomain = (domain: string): Question[] => {
    return AWS_QUESTIONS.filter(q => q.domain === domain);
};
export const getCompTiaQuestionsByDomain = (domain: string): Question[] => {
    return COMPTIA_QUESTIONS.filter(q => q.domain === domain);
};

export const getAwsQuestionsByDifficulty = (difficulty: string): Question[] => {
    return AWS_QUESTIONS.filter(q => q.difficulty === difficulty);
};
export const getCompTiaQuestionsByDifficulty = (difficulty: string): Question[] => {
    return COMPTIA_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const getAwsQuestionsByCategory = (category: string): Question[] => {
    return AWS_QUESTIONS.filter(q => q.category.includes(category));
};
export const getCompTiaQuestionsByCategory = (category: string): Question[] => {
    return COMPTIA_QUESTIONS.filter(q => q.category.includes(category));
};
export const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...COMPTIA_QUESTIONS, ...AWS_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Statistics for dashboard
export const getAwsQuestionStats = () => {
    const domains = [...new Set(AWS_QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(AWS_QUESTIONS.map(q => q.difficulty))];
    const categories = [...new Set(AWS_QUESTIONS.map(q => q.category))];

    console.log('AWS Domain Question Count', domains.length);
    console.log('AWS Difficulty Question Count', difficulties.length);
    console.log('AWS Categories Question Count', categories.length);
    return {
        total: AWS_QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: AWS_QUESTIONS.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: AWS_QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        categories: categories.length
    };
};
export const getCompTiaQuestionStats = () => {
    const domains = [...new Set(COMPTIA_QUESTIONS.map(q => q.domain))];
    const difficulties = [...new Set(COMPTIA_QUESTIONS.map(q => q.difficulty))];
    const categories = [...new Set(COMPTIA_QUESTIONS.map(q => q.category))];

    console.log('CompTIA Domain Question Count', domains.length);
    console.log('CompTIA Difficulty Question Count', difficulties.length);
    console.log('CompTIA Categories Question Count', categories.length);
    return {
        total: COMPTIA_QUESTIONS.length,
        byDomain: domains.map(domain => ({
            domain,
            count: COMPTIA_QUESTIONS.filter(q => q.domain === domain).length
        })),
        byDifficulty: difficulties.map(difficulty => ({
            difficulty,
            count: COMPTIA_QUESTIONS.filter(q => q.difficulty === difficulty).length
        })),
        categories: categories.length
    };
};
