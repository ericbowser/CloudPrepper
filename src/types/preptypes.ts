// Type definitions
interface Domain {
    name: string;
    progress: number;
}

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

export type SectionType = 'dashboard' | 'practice' | 'analytics' | 'study-plan';