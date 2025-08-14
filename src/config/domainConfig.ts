// src/config/domainConfig.ts - Updated for PostgreSQL integration
import { Domain, Question, CertificationData } from '../types/preptypes';

// Domain configurations that will be populated with PostgreSQL data
export const COMPTIA_DOMAINS: Domain[] = [
	{
		id: 'cloud-architecture-design',
		name: 'Cloud Architecture and Design',
		description: 'Cloud concepts, models, and architectural designs',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
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
		id: 'deployment',
		name: 'Deployment',
		description: 'Cloud service deployment and migration strategies',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
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
		id: 'operations-support',
		name: 'Operations and Support',
		description: 'Cloud operations, monitoring, and maintenance',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
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
		description: 'Cloud security implementations and best practices',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
		categories: [],
		totalQuestions: 0,
		weight: 25,
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
		id: 'devops',
		name: 'DevOps',
		description: 'DevOps practices and automation in cloud environments',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
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
		questions: [], // Will be populated from PostgreSQL
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

export const AWS_DOMAINS: Domain[] = [
	{
		id: 'resilient-architectures',
		name: 'Design Resilient Architectures',
		description: 'High availability, disaster recovery, and fault tolerance',
		progress: 0,
		questions: [], // Will be populated from PostgreSQL
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
		questions: [], // Will be populated from PostgreSQL
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
		questions: [], // Will be populated from PostgreSQL
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
		questions: [], // Will be populated from PostgreSQL
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

// Function to populate domains with questions from PostgreSQL
export const populateDomainsWithQuestions = (domains: Domain[], questions: Question[]): Domain[] => {
	return domains.map(domain => {
		// Filter questions by domain mapping - you may need to adjust this based on your actual domain values in the database
		const domainQuestions = questions.filter(question => {
			const questionDomain = question.domain.toLowerCase();
			const domainId = domain.id.toLowerCase();

			// NOTE: This hardcoded mapping is brittle. A more robust solution would be to have a
			// `domain_id` column in your database tables that directly corresponds to the `id`
			// of the domains defined here (e.g., 'resilient-architectures', 'security').
			// This would remove the need for this switch statement.
			// Add domain mapping logic based on your actual data
			switch (domainId) {
				// AWS Domain Mapping
				case 'resilient-architectures':
					return questionDomain.includes('Design Resilient Architectures') ||
						questionDomain.includes('Domain 1');
				case 'high-performing-architectures':
					return questionDomain.includes('Design High-Performing Architectures') ||
						questionDomain.includes('Domain 3');
				case 'secure-architectures':
					return questionDomain.includes('Design Secure Architectures') ||
						questionDomain.includes('Domain 2');
				case 'cost-optimized-architectures':
					return questionDomain.includes('Design Cost-Optimized Architectures') ||
						questionDomain.includes('Domain 4');

				// CompTIA Domain Mapping (based on your actual data structure)
				case 'cloud-architecture-design':
					return questionDomain === 'Domain 1'; // Cloud Architecture and Design
				case 'security':
					return questionDomain === 'Domain 4'; // Security
				case 'deployment':
					return questionDomain === 'Domain 2'; // Deployment  
				case 'operations-support':
					return questionDomain === 'Domain 3'; // Operations and Support
				case 'devops':
					return questionDomain === 'Domain 5'; // DevOps
				case 'troubleshooting':
					return questionDomain === 'Domain 6'; // Troubleshooting
				default:
					return false;
			}
		});

		const categories = [...new Set(domainQuestions.map(q => q.category))];

		return {
			...domain,
			questions: domainQuestions,
			categories,
			totalQuestions: domainQuestions.length
		};
	});
};

// Main certification configuration - will be populated asynchronously
export const CERTIFICATIONS: CertificationData[] = [
	{
		id: 'comptia',
		name: 'CompTIA Cloud+',
		fullName: 'CompTIA Cloud+ Certification',
		code: 'CV0-003',
		icon: '☁️',
		domains: COMPTIA_DOMAINS, // Will be populated with questions from PostgreSQL
		examInfo: {
			questionCount: 100,
			timeLimit: 90,
			passingScore: 750
		},
		totalQuestions: 0 // Will be updated when questions are loaded
	},
	{
		id: 'aws',
		name: 'AWS Solutions Architect',
		fullName: 'AWS Certified Solutions Architect Associate',
		code: 'SAA-C03',
		icon: '🏗️',
		domains: AWS_DOMAINS, // Will be populated with questions from PostgreSQL
		examInfo: {
			questionCount: 65,
			timeLimit: 130,
			passingScore: 720
		},
		totalQuestions: 0 // Will be updated when questions are loaded
	}
];

// Helper function to update certification with loaded questions
export const updateCertificationWithQuestions = (
	certificationId: 'comptia' | 'aws',
	questions: Question[]
): CertificationData => {
	const cert = CERTIFICATIONS.find(c => c.id === certificationId);
	if (!cert) {
		throw new Error(`Certification ${certificationId} not found`);
	}

	const populatedDomains = populateDomainsWithQuestions(cert.domains, questions);
	const totalQuestions = populatedDomains.reduce((sum, domain) => sum + domain.totalQuestions, 0);

	return {
		...cert,
		domains: populatedDomains,
		totalQuestions
	};
};