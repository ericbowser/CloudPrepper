// C:/Projects/CompTIA/src/types/preptypes.ts

import React from "react";

// Types
export interface Domain {
    name: string;
    progress: number;
}

export interface QuestionOptionData {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    questionNumber: number;
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

export interface SelectedAnswer {
    index: number;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    questionNumber: number; // Useful for display and tracking
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

// A specific type for recording a user's submitted answer
export interface AnswerRecord {
    questionIndex: number;
    selectedOptionIndex: number;
    isCorrect: boolean;
    timeTaken: number;
}

export interface NavTabProps {
    label: string;
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
    isSelected: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    onClick: () => void;
}

export interface UserAnswer {
    questionId: number,
    selectedIndex: number,
    isCorrect: boolean,
    timeSpent: number,
    userAnswers?: AnswerRecord[]
}

export interface QuizSession {
    answers: UserAnswer[];
    startTime: Date;
    currentMode: AnswerMode;
}

export type AnswerMode = 'inline' | 'end-only';
export type SectionType = 'dashboard' | 'practice' | 'analytics' | 'study-plan' | 'results' | 'review';
export type QuizMode = 'quiz' | 'review';
