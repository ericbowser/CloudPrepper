// src/config/env.ts - Environment configuration
// For Vite, use import.meta.env for client-side variables
// Variables must be prefixed with VITE_ to be exposed to the client

/// <reference types="vite/client" />

// Type-safe access to import.meta.env
const getEnvVar = (key: string, defaultValue: string): string => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return (import.meta.env as Record<string, string | undefined>)[key] || defaultValue;
    }
    return defaultValue;
};

export const CLOUD_PREPPER_BASE_URL = 
    getEnvVar('VITE_CLOUD_PREPPER_BASE_URL', 
        getEnvVar('VITE_API_URL', 'http://localhost:36236'));

export const CLOUD_PREPPER_GET_QUESTIONS = 
    getEnvVar('VITE_CLOUD_PREPPER_GET_QUESTIONS', '/getExamQuestions');

export const CLOUD_PREPPER_ADD_QUESTION = 
    getEnvVar('VITE_CLOUD_PREPPER_ADD_QUESTION', '/api/questions/addQuestion');

export const CLOUD_PREPPER_UPDATE_QUESTION = 
    getEnvVar('VITE_CLOUD_PREPPER_UPDATE_QUESTION', '/updateQuestion');

export const CLOUD_PREPPER_BACKUP_STATUS = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_STATUS', '/api/backup/status');

export const CLOUD_PREPPER_BACKUP_DASHBOARD = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_DASHBOARD', '/api/backup/dashboard');

export const CLOUD_PREPPER_BACKUP_LIST = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_LIST', '/api/backup/list');

export const CLOUD_PREPPER_BACKUP_GENERATE = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_GENERATE', '/api/backup/generate');

export const CLOUD_PREPPER_BACKUP_DOWNLOAD = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_DOWNLOAD', '/api/backup/download');

export const CLOUD_PREPPER_BACKUP_RESTORE = 
    getEnvVar('VITE_CLOUD_PREPPER_BACKUP_RESTORE', '/api/backup/restore');
