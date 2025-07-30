import {AWS_QUESTIONS} from "../QuestionRepository/AWS_Certified_Architect_Associate_Questions";
import {COMPTIA_QUESTIONS} from "../QuestionRepository/CompTIA_Cloud_Plus_Questions";
import {Question} from "../types/preptypes";
// Helper functions for question management
export const getAwsQuestionsByDomain = (domain: string): Question[] => {
	const awsdomain = AWS_QUESTIONS.filter(q => q.domain === domain);
	console.log("AWS Domomain Questions:", awsdomain.length);
	return awsdomain;
};
export const getCompTiaQuestionsByDomain = (domain: string): Question[] => {
	const comptiadomain = COMPTIA_QUESTIONS.filter(q => q.domain === domain);
	console.log("CompTIA Domain Questions:", comptiadomain.length);
	return comptiadomain;
};

export const getAwsQuestionsByDifficulty = (difficulty: string): Question[] => {
	const awsdifficulty = AWS_QUESTIONS.filter(q => q.difficulty === difficulty);
	console.log("AWS Difficulty Questions:", awsdifficulty.length);
	return awsdifficulty;
};
export const getCompTiaQuestionsByDifficulty = (difficulty: string): Question[] => {
	const comptiadifficulty = COMPTIA_QUESTIONS.filter(q => q.difficulty === difficulty);
	console.log("CompTIA Difficulty Questions:", comptiadifficulty.length);
	return comptiadifficulty;
};
export const getAllQuestionsByDifficulty = (difficulty: string): Question[] => {
	const x = [...AWS_QUESTIONS, ...COMPTIA_QUESTIONS].filter(q => q.difficulty === difficulty);
	console.log("CompTIA Difficulty Questions:", x.length);
	return x;
};

export const getAwsQuestionsByCategory = (category: string): Question[] => {
	const awscategory = AWS_QUESTIONS.filter(q => q.category.includes(category));
	console.log("AWS Category Questions:", awscategory.length);
	return awscategory;
};
export const getCompTiaQuestionsByCategory = (category: string): Question[] => {
	const comptiacategory = COMPTIA_QUESTIONS.filter(q => q.category.includes(category));
	console.log("CompTIA Category Questions:", comptiacategory.length);
	return comptiacategory;
};
export const getRandomQuestions = (count: number): Question[] => {
	const shuffled = [...COMPTIA_QUESTIONS, ...AWS_QUESTIONS].sort(() => 0.5 - Math.random());
	console.log("Shuffled Questions:", shuffled.length);
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
