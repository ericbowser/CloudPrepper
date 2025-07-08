// Type definitions
// Export interfaces using ES6 syntax
export interface Domain {
    name: string;
    progress: number;
}

export interface SelectedAnswer {
    index: number;
    isCorrect: boolean;
}

export interface NavTabProps {
    label: string;
    section: string;
    isActive: boolean;
    onClick: () => void;
}

export interface ProgressCircleProps {
    percentage: number;
}

export interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
}

export interface DomainProgressProps {
    name: string;
    progress: number;
}

export interface QuestionOptionProps {
    children: React.ReactNode;
    index: number;
    isSelected: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    onClick: () => void;
}

export interface Question {
    children: React.ReactNode;
    questionText: string,
    questionNumber: number,
    isCurrentQuestion: boolean,
    onClick: () => void;
}

export interface QuestionOptionData {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    category: string;
    difficulty: string;
    domain: string;
    questionText: string;
    options: QuestionOptionData[];
    explanation: string;
    explanationDetails?: {
        summary: string;
        breakdown: string[];
        otherOptions: string;
    };
}

// The 'section' prop was removed as it's redundant. The parent component
// already knows the section and controls it via the `onClick` handler.
}

export interface ProgressCircleProps {
    percentage: number;
}

export interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
}

export interface DomainProgressProps {
    name: string;
    progress: number;
}

export interface QuestionOptionProps {
    children: React.ReactNode;
    isSelected: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    onClick: () => void;
    // The 'index' prop is not needed here if the key is handled in the parent's .map() loop.
}
export interface Questions[] {
    explanation: "Question Array";
}

export type SectionType = 'dashboard' | 'practice' | 'analytics' | 'study-plan';