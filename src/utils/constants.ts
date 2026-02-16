// TODO: Add AWS domains and update postgres

// CompTIA domains
export const COMPTIA_DOMAINS = {
    CLOUD_ARCHITECTURE_AND_DESIGN: 'Cloud Architecture and Design',
    CLOUD_DEPLOYMENT: 'Cloud Deployment',
    OPERATIONS_AND_SUPPORT: 'Operations and Support',
    SECURITY: 'Security',
    DEVOPS_FUNDAMENTALS: 'DevOps Fundamentals',
    TROUBLESHOOTING: 'Troubleshooting'
} as const;

export const SKILL_LEVELS = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
    EXPERT: 'Expert'
} as const;

export const COGNITIVE_LEVELS = {
    KNOWLEDGE: 'Knowledge',
    COMPREHENSION: 'Comprehension',
    EVALUATION: 'Evaluation',
    APPLICATION: 'Application',
    ANALYSIS: 'Analysis',
    SYNTHESIS: 'Synthesis'
} as const;

// Helper arrays for easy iteration
export const SKILL_LEVELS_ARRAY = Object.values(SKILL_LEVELS);
export const COGNITIVE_LEVELS_ARRAY = Object.values(COGNITIVE_LEVELS);
