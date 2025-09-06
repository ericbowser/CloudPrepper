// types/database.ts - Database row types for PostgreSQL integration

// Base database row interface for question tables
interface BaseQuestionRow {
    question_id: number;
    question_number: number;
    category: string | null;
    difficulty: string | null;
    domain: string | null;
    question_text: string;
    options: QuestionOption[] | string; // JSONB can come as parsed object or string
    correct_answer: string;
    explanation: string | null;
    explanation_details: ExplanationDetails | string; // JSONB can come as parsed object or string
}

// Question option structure (matches your JSONB format)
export interface QuestionOption {
    text: string;
    isCorrect: boolean;
}

// Explanation details structure (matches your JSONB format)
export interface ExplanationDetails {
    summary: string;
    breakdown: string[];
    otherOptions: string[];
}

// CompTIA specific row type
export interface ComptiaQuestionRow extends BaseQuestionRow {
    // CompTIA uses these specific difficulty levels
    difficulty: 'Knowledge' | 'Comprehension' | 'Application' | 'Analysis' | 'Expert' | null;
    // CompTIA uses these domain patterns
    domain: 'Domain 1' | 'Domain 2' | 'Domain 3' | 'Domain 4' | 'Domain 5' | 'Domain 6' | null;
}

// AWS specific row type  
export interface AwsQuestionRow extends BaseQuestionRow {
    // AWS uses these specific difficulty levels
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Application' | null;
    // AWS uses these domain patterns
    domain: 'Domain 1: Design Resilient Architectures' |
        'Domain 2: Design Secure Architectures' |
        'Domain 3: Design High-Performing Architectures' |
        'Domain 4: Design Cost-Optimized Architectures' | null;
}

// Union type for any question row
export type QuestionRow = ComptiaQuestionRow | AwsQuestionRow;

// Type guard functions to check which type of row we have
export const isComptiaRow = (row: QuestionRow): row is ComptiaQuestionRow => {
    return Boolean(row.domain?.startsWith('Domain ') && !row.domain.includes(':'));
};

export const isAwsRow = (row: QuestionRow): row is AwsQuestionRow => {
    return row.domain?.includes(':') || false;
};

// Helper type for parsed options (when JSONB is already parsed)
export interface ParsedQuestionOptions {
    options: QuestionOption[];
    explanation_details: ExplanationDetails | null;
}

// Type for the transformation function result (matches your Question interface)
export interface TransformedQuestion {
    id: number;
    questionNumber: number;
    category: string;
    difficulty: string;
    domain: string;
    questionText: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
    explanationDetails: ExplanationDetails | null;
    children?: undefined;
    isCurrentQuestion: boolean;
    onClick: () => void;
}