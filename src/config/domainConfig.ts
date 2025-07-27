// src/config/domainConfig.ts - FIXED VERSION that matches your question structure
import { Domain, Question, CertificationData } from '../types/preptypes';
import { COMPTIA_QUESTIONS } from '../QuestionRepository/CompTIA_Cloud_Plus_Questions';
import { AWS_QUESTIONS } from '../QuestionRepository/AWS_Certified_Architect_Associate_Questions';

console.log('Loading questions...');
console.log('CompTIA questions:', COMPTIA_QUESTIONS?.length || 0);
console.log('AWS questions:', AWS_QUESTIONS?.length || 0);

// Map questions to domains based on actual domain values in your questions
const mapCompTIAQuestions = () => {
	const domainMapping: { [key: string]: Question[] } = {
		'cloud-architecture': [],
		'deployments': [],
		'operations': [],
		'security': [],
		'devops': [],
		'troubleshooting': []
	};

	if (!COMPTIA_QUESTIONS) {
		console.log('No CompTIA questions found');
		return domainMapping;
	}

	COMPTIA_QUESTIONS.forEach(question => {
		const domain = question.domain;

		// Map based on actual domain values in your questions
		switch (domain) {
			case 'Domain 1':
				domainMapping['cloud-architecture'].push(question);
				break;
			case 'Domain 2':
				domainMapping['deployments'].push(question);
				break;
			case 'Domain 3':
				domainMapping['operations'].push(question);
				break;
			case 'Domain 4':
				domainMapping['security'].push(question);
				break;
			case 'Domain 5':
				domainMapping['devops'].push(question);
				break;
			case 'Domain 6':
				domainMapping['troubleshooting'].push(question);
				break;
			default:
				console.log(`Unmapped CompTIA domain: "${domain}" - adding to cloud-architecture`);
				domainMapping['cloud-architecture'].push(question);
		}
	});

	// Log the mapping results
	console.log('=== CompTIA DOMAIN MAPPING ===');
	Object.entries(domainMapping).forEach(([key, questions]) => {
		console.log(`${key}: ${questions.length} questions`);
	});

	return domainMapping;
};

const mapAWSQuestions = () => {
	const domainMapping: { [key: string]: Question[] } = {
		'secure-architectures': [],
		'resilient-architectures': [],
		'high-performing-architectures': [],
		'cost-optimized-architectures': []
	};

	if (!AWS_QUESTIONS) {
		console.log('No AWS questions found');
		return domainMapping;
	}

	AWS_QUESTIONS.forEach(question => {
		const domain = question.domain;

		// Map based on actual domain values in your AWS questions
		if (domain.includes('Domain 1') || domain.includes('Resilient')) {
			domainMapping['resilient-architectures'].push(question);
		} else if (domain.includes('Domain 2') || domain.includes('High-Performing')) {
			domainMapping['high-performing-architectures'].push(question);
		} else if (domain.includes('Domain 3') || domain.includes('Secure')) {
			domainMapping['secure-architectures'].push(question);
		} else if (domain.includes('Domain 4') || domain.includes('Cost-Optimized')) {
			domainMapping['cost-optimized-architectures'].push(question);
		} else {
			console.log(`Unmapped AWS domain: "${domain}"`);
			domainMapping['secure-architectures'].push(question);
		}
	});

	// Log the mapping results
	console.log('=== AWS DOMAIN MAPPING ===');
	Object.entries(domainMapping).forEach(([key, questions]) => {
		console.log(`${key}: ${questions.length} questions`);
	});

	return domainMapping;
};

// Create the mappings
const comptiaQuestionsByDomain = mapCompTIAQuestions();
const awsQuestionsByDomain = mapAWSQuestions();

// CompTIA Cloud+ Domain Configuration
export const COMPTIA_DOMAINS: Domain[] = [
	{
		id: 'cloud-architecture',
		name: 'Cloud Architecture',
		description: 'Cloud concepts, models, and architectural designs',
		progress: 0,
		questions: comptiaQuestionsByDomain['cloud-architecture'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 25,
		icon: '🏗️',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'deployments',
		name: 'Deployments',
		description: 'Cloud service deployment and migration strategies',
		progress: 0,
		questions: comptiaQuestionsByDomain['deployments'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 20,
		icon: '🚀',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'operations',
		name: 'Operations',
		description: 'Cloud operations, monitoring, and maintenance',
		progress: 0,
		questions: comptiaQuestionsByDomain['operations'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 20,
		icon: '⚙️',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'security',
		name: 'Security',
		description: 'Cloud security, compliance, and risk management',
		progress: 0,
		questions: comptiaQuestionsByDomain['security'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 25,
		icon: '🔒',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'devops',
		name: 'DevOps',
		description: 'Automation, CI/CD, and development operations',
		progress: 0,
		questions: comptiaQuestionsByDomain['devops'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 5,
		icon: '🔄',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'troubleshooting',
		name: 'Troubleshooting',
		description: 'Problem diagnosis and resolution in cloud environments',
		progress: 0,
		questions: comptiaQuestionsByDomain['troubleshooting'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 5,
		icon: '🔧',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	}
];

// AWS Solutions Architect Domains
export const AWS_DOMAINS: Domain[] = [
	{
		id: 'resilient-architectures',
		name: 'Design Resilient Architectures',
		description: 'High availability, disaster recovery, and fault tolerance',
		progress: 0,
		questions: awsQuestionsByDomain['resilient-architectures'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 26,
		icon: '🔧',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'high-performing-architectures',
		name: 'Design High-Performing Architectures',
		description: 'Performance optimization and scalability',
		progress: 0,
		questions: awsQuestionsByDomain['high-performing-architectures'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 24,
		icon: '⚡',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'secure-architectures',
		name: 'Design Secure Architectures',
		description: 'Security best practices and secure architecture design',
		progress: 0,
		questions: awsQuestionsByDomain['secure-architectures'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 30,
		icon: '🛡️',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	},
	{
		id: 'cost-optimized-architectures',
		name: 'Design Cost-Optimized Architectures',
		description: 'Cost management and optimization strategies',
		progress: 0,
		questions: awsQuestionsByDomain['cost-optimized-architectures'] || [],
		categories: [],
		totalQuestions: 0,
		weight: 20,
		icon: '💰',
		studyProgress: {
			attempted: 0,
			correct: 0,
			accuracy: 0,
			timeSpent: 0,
			weakCategories: []
		}
	}
];

// Initialize domain metadata after questions are loaded
export const initializeDomains = (domains: Domain[]): Domain[] => {
	return domains.map(domain => {
		const categories = [...new Set(domain.questions.map(q => q.category))];
		console.log(`Domain ${domain.name}: ${domain.questions.length} questions, categories:`, categories.slice(0, 3));
		return {
			...domain,
			categories,
			totalQuestions: domain.questions.length
		};
	});
};

// Main certification configuration
export const CERTIFICATIONS: CertificationData[] = [
	{
		id: 'comptia',
		name: 'CompTIA Cloud+',
		fullName: 'CompTIA Cloud+ Certification',
		code: 'CV0-003',
		icon: '☁️',
		domains: initializeDomains(COMPTIA_DOMAINS),
		examInfo: {
			questionCount: 100,
			timeLimit: 90,
			passingScore: 750
		},
		totalQuestions: COMPTIA_DOMAINS.reduce((sum, domain) => sum + domain.questions.length, 0)
	},
	{
		id: 'aws',
		name: 'AWS Solutions Architect',
		fullName: 'AWS Certified Solutions Architect Associate',
		code: 'SAA-C03',
		icon: '🏗️',
		domains: initializeDomains(AWS_DOMAINS),
		examInfo: {
			questionCount: 65,
			timeLimit: 130,
			passingScore: 720
		},
		totalQuestions: AWS_DOMAINS.reduce((sum, domain) => sum + domain.questions.length, 0)
	}
];

// Debug: Print final certification info
console.log('=== FINAL CERTIFICATION INFO ===');
CERTIFICATIONS.forEach(cert => {
	console.log(`${cert.name}: ${cert.totalQuestions} total questions`);
	cert.domains.forEach(domain => {
		console.log(`  - ${domain.name}: ${domain.totalQuestions} questions`);
	});
});