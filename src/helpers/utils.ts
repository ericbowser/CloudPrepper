import {Question} from "../types/preptypes";
// Helper functions for question management
/*
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
*/

export const getAwsQuestionsByDifficulty = (awsQuestions: Question[], difficulty: string): Question[] => {
	const awsdifficulty = awsQuestions.filter(q => q.difficulty === difficulty);
	console.log("AWS Difficulty Questions:", awsdifficulty.length);
	return awsdifficulty;
};
export const getCompTiaQuestionsByDifficulty = (comptiaQuestions: Question[], difficulty: string): Question[] => {
	const comptiadifficulty = comptiaQuestions.filter(q => q.difficulty === difficulty);
	console.log("CompTIA Difficulty Questions:", comptiadifficulty.length);
	return comptiadifficulty;
};
export const getAllQuestionsByDifficulty = (comptiaQuestions: Question[], awsQuestions: Question[], difficulty: string): Question[] => {
	const x = [...awsQuestions, ...comptiaQuestions].filter(q => q.difficulty === difficulty);
	console.log("CompTIA Difficulty Questions:", x.length);
	return x;
};

export const getAwsQuestionsByCategory = (awsQuestions: Question[], category: string): Question[] => {
	const awscategory = awsQuestions.filter(q => q.category.includes(category));
	console.log("AWS Category Questions:", awscategory.length);
	return awscategory;
};
export const getCompTiaQuestionsByCategory = (comptiaQuestions: Question[], category: string): Question[] => {
	const comptiacategory = comptiaQuestions.filter(q => q.category.includes(category));
	console.log("CompTIA Category Questions:", comptiacategory.length);
	return comptiacategory;
};
export const getRandomQuestions = (comptiaQuestions: Question[], awsQuestions: Question[], count: number): Question[] => {
	const shuffled = [...comptiaQuestions, ...awsQuestions].sort(() => 0.5 - Math.random());
	console.log("Shuffled Questions:", shuffled.length);
	return shuffled.slice(0, count);
};

// Statistics for dashboard
export const getAwsQuestionStats = (awsQuestions: Question[]) => {
	const domains = [...new Set(awsQuestions.map(q => q.domain))];
	const difficulties = [...new Set(awsQuestions.map(q => q.difficulty))];
	const categories = [...new Set(awsQuestions.map(q => q.category))];

	console.log('AWS Domain Question Count', domains.length);
	console.log('AWS Difficulty Question Count', difficulties.length);
	console.log('AWS Categories Question Count', categories.length);
	return {
		total: awsQuestions.length,
		byDomain: domains.map(domain => ({
			domain,
			count: awsQuestions.filter(q => q.domain === domain).length
		})),
		byDifficulty: difficulties.map(difficulty => ({
			difficulty,
			count: awsQuestions.filter(q => q.difficulty === difficulty).length
		})),
		categories: categories.length
	};
};
export const getCompTiaQuestionStats = (comptiaQuestions: Question[]) => {
	const domains = [...new Set(comptiaQuestions.map(q => q.domain))];
	const difficulties = [...new Set(comptiaQuestions.map(q => q.difficulty))];
	const categories = [...new Set(comptiaQuestions.map(q => q.category))];

	console.log('CompTIA Domain Question Count', domains.length);
	console.log('CompTIA Difficulty Question Count', difficulties.length);
	console.log('CompTIA Categories Question Count', categories.length);
	return {
		total: comptiaQuestions.length,
		byDomain: domains.map(domain => ({
			domain,
			count: comptiaQuestions.filter(q => q.domain === domain).length
		})),
		byDifficulty: difficulties.map(difficulty => ({
			difficulty,
			count: comptiaQuestions.filter(q => q.difficulty === difficulty).length
		})),
		categories: categories.length
	};
};
