// src/types/preptypes.ts - Updated with domain-based question system

import type {ReactNode} from "react";

// Enhanced Domain interface with embedded questions
export interface Domain {
    id: string;
    name: string;
    description: string;
    progress: number;
    questions: Question[];
    categories: string[];
    totalQuestions: number;
    weight?: number; // For exam weighting (e.g., 25% of exam)
    icon?: string;
    studyProgress?: {
        attempted: number;
        correct: number;
        accuracy: number;
        timeSpent: number; // in minutes
        lastStudied?: Date;
        weakCategories: string[];
    };
}

// Quiz configuration interface
export interface QuizConfig {
    testType: string;
    selectedDomains: string[];
    selectedCategories: string[];
    difficulty: string;
    questionCount: number;
    certification: 'comptia' | 'aws';
}

// Certification data structure
export interface CertificationData {
    id: 'comptia' | 'aws';
    name: string;
    fullName: string;
    code: string;
    icon: string;
    domains: Domain[];
    examInfo: {
        questionCount: number;
        timeLimit: number; // in minutes
        passingScore?: number;
    };
    totalQuestions: number;
}

// Updated section types to include question selection
export type SectionType =
    'dashboard'
    | 'practice'
    | 'analytics'
    | 'study-plan'
    | 'results'
    | 'review'
    | 'quiz'
    | 'exam'
    | 'question-selection';

// Existing interfaces (keep these unchanged)
export interface QuestionOptionData {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    question_id: number;
    question_number: number; // Useful for display and tracking
    category: string;
    difficulty: string;
    domainId?: string; // Added to link question to a specific domain config
    domain: string;
    question_text: string;
    options: QuestionOptionData[];
    correct_answer: string;
    multiple_answers: boolean;
    correct_answers: string[];
    explanation: string;
    explanation_details?: {
        summary: string;
        breakdown: string[];
        otherOptions: string;
    };
}

// A specific type for recording a user's submitted answer
export interface AnswerRecord {
    questionId: number;
    selectedAnswers: string[];
    isCorrect: boolean;
    timeSpent: number; // in milliseconds
    timestamp: Date;
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

export enum AnswerMode { 'inline' = 0, 'endOnly' = 1 }

export type QuizMode = 'quiz' | 'review';
