// src/config/domainConfig.ts - Updated for API integration
import { Domain, Question, CertificationData } from '../types/preptypes';

// Helper function to populate domains with questions based on domain matching
const populateDomainsWithQuestions = (domains: Domain[], questions: Question[]): Domain[] => {
	return domains.map(domain => {
		const domainQuestions = questions.filter(question => {
			const questionDomain = question.domain.toLowerCase();
            const category = question.category.toLowerCase();

			// CompTIA Cloud+ domain mapping (CV0-003)
			if (domain.id === 'cloud-architecture') {
				return category.includes('cloud architecture') ||
					questionDomain.includes('cloud architecture');
			}
			if (domain.id === 'deployments') {
				return questionDomain.includes('domain 2') ||
					questionDomain.includes('deployment');
			}
			if (domain.id === 'operations-support') {
				return questionDomain.includes('domain 3') ||
					questionDomain.includes('operations') ||
					questionDomain.includes('support');
			}
			if (domain.id === 'security') {
				return questionDomain.includes('domain 4') ||
					questionDomain.includes('security');
			}
			if (domain.id === 'devops') {
				return questionDomain.includes('domain 5') ||
					questionDomain.includes('devops');
			}
			if (domain.id === 'troubleshooting') {
				return questionDomain.includes('domain 6') ||
					questionDomain.includes('troubleshooting');
			}

			// AWS Solutions Architect domain mapping (SAA-C03)
			if (domain.id === 'secure-architectures') {
				return questionDomain.includes('secure') ||
					questionDomain.includes('design secure') ||
					(questionDomain.includes('domain 1') && questionDomain.includes('design'));
			}
			if (domain.id === 'resilient-architectures') {
				return questionDomain.includes('resilient') ||
					questionDomain.includes('design resilient') ||
					(questionDomain.includes('domain 2') && questionDomain.includes('design'));
			}
			if (domain.id === 'high-performing-architectures') {
				return questionDomain.includes('high-performing') ||
					questionDomain.includes('design high-performing') ||
					(questionDomain.includes('domain 3') && questionDomain.includes('design'));
			}
			if (domain.id === 'cost-optimized-architectures') {
				return questionDomain.includes('cost-optimized') ||
					questionDomain.includes('design cost-optimized') ||
					(questionDomain.includes('domain 4') && questionDomain.includes('design'));
			}

			return false;
		});

		const categories = [...new Set(domainQuestions.map(q => q.category))];

		console.log(`📊 Domain "${domain.name}": ${domainQuestions.length} questions, Categories: ${categories.slice(0, 3).join(', ')}${categories.length > 3 ? '...' : ''}`);

		return {
			...domain,
			questions: domainQuestions,
			categories,
			totalQuestions: domainQuestions.length
		};
	});
};

// CompTIA Cloud+ Domains (CV0-003)
export const COMPTIA_DOMAINS: Domain[] = [
	{
		id: 'cloud-architecture',
		name: 'Cloud Architecture and Models',
		description: 'Cloud concepts, deployment models, and service types (25%)',
		progress: 0,
		questions: [],
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
		name: 'Cloud Deployment',
		description: 'Deployment strategies, migration, and integration (20%)',
		progress: 0,
		questions: [],
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
		description: 'Cloud operations, monitoring, and maintenance (20%)',
		progress: 0,
		questions: [],
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
		description: 'Cloud security principles and implementation (25%)',
		progress: 0,
		questions: [],
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
		name: 'DevOps and Automation',
		description: 'DevOps practices and automation (5%)',
		progress: 0,
		questions: [],
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
		description: 'Problem identification and resolution (5%)',
		progress: 0,
		questions: [],
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

// AWS Solutions Architect Domains (SAA-C03)
export const AWS_DOMAINS: Domain[] = [
	{
		id: 'secure-architectures',
		name: 'Design Secure Architectures',
		description: 'Security best practices and secure architecture design (30%)',
		progress: 0,
		questions: [],
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
		id: 'resilient-architectures',
		name: 'Design Resilient Architectures',
		description: 'High availability, disaster recovery, and fault tolerance (26%)',
		progress: 0,
		questions: [],
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
		description: 'Performance optimization and scalability (24%)',
		progress: 0,
		questions: [],
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
		id: 'cost-optimized-architectures',
		name: 'Design Cost-Optimized Architectures',
		description: 'Cost management and optimization strategies (20%)',
		progress: 0,
		questions: [],
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

// Main certification configuration - will be populated with questions from API
export const CERTIFICATIONS: CertificationData[] = [
	{
		id: 'comptia',
		name: 'CompTIA Cloud+',
		fullName: 'CompTIA Cloud+ Certification',
		code: 'CV0-003',
		icon: '☁️',
		domains: COMPTIA_DOMAINS,
		examInfo: {
			questionCount: 90,
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
		domains: AWS_DOMAINS,
		examInfo: {
			questionCount: 65,
			timeLimit: 130,
			passingScore: 720
		},
		totalQuestions: 0 // Will be updated when questions are loaded
	}
];

// Helper function to update certification with loaded questions from API
export const updateCertificationWithQuestions = (
	certificationId: 'comptia' | 'aws',
	questions: Question[]
): CertificationData => {
	const cert = CERTIFICATIONS.find(c => c.id === certificationId);
	if (!cert) {
		throw new Error(`Certification ${certificationId} not found`);
	}

	console.log(`🔄 Updating ${cert.name} with ${questions.length} questions`);

	// Populate domains with questions based on domain matching
	const populatedDomains = populateDomainsWithQuestions(cert.domains, questions);
	const totalQuestions = populatedDomains.reduce((sum, domain) => sum + domain.totalQuestions, 0);

	// Log domain distribution for debugging
	console.log(`📈 ${cert.name} Domain Distribution:`);
	populatedDomains.forEach(domain => {
		console.log(`  📚 ${domain.name}: ${domain.totalQuestions} questions (${domain.weight}% of exam)`);
	});

	// Validation - ensure questions are properly distributed
	if (totalQuestions === 0) {
		console.warn(`⚠️ No questions mapped for ${cert.name}. Check domain mapping logic.`);
	}

	return {
		...cert,
		domains: populatedDomains,
		totalQuestions
	};
};

// Helper function to get question distribution statistics
export const getQuestionDistributionStats = (certification: CertificationData) => {
	const stats = {
		totalQuestions: certification.totalQuestions,
		domainStats: certification.domains.map(domain => ({
			name: domain.name,
			questionCount: domain.totalQuestions,
			percentage: certification.totalQuestions > 0 ?
				Math.round((domain.totalQuestions / certification.totalQuestions) * 100) : 0,
			examWeight: domain.weight,
			categories: domain.categories.length
		})),
		unmappedQuestions: 0 // Could be calculated if needed
	};

	return stats;
};

// Export individual domain arrays for reference
export { populateDomainsWithQuestions };