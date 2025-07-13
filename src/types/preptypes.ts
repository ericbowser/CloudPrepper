// C:/Projects/CompTIA/src/types/preptypes.ts

import React from "react";

/**
 * =================================================================
 * DATA MODELS
 *
 * These interfaces define the core data structures of your application.
 * They should be pure data, without any UI-specific logic.
 * =================================================================
 */

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
}

/**
 * =================================================================
 * UI & STATE MODELS
 *
 * These types define the shape of state variables and UI-related
 * concepts used throughout the application.
 * =================================================================
 */

export interface SelectedAnswer {
    index: number;
    isCorrect: boolean;
}

// Added 'results' to support the quiz summary view.
export type SectionType = 'dashboard' | 'practice' | 'analytics' | 'study-plan' | 'results';


/**
 * =================================================================
 * COMPONENT PROP INTERFACES
 *
 * These interfaces define the "props" for each React component,
 * acting as a contract for how components receive data and functions.
 * =================================================================
 */

export interface NavTabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export interface ProgressCircleProps {
    percentage: number;
}

export interface StatCardProps {
    title:string;
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