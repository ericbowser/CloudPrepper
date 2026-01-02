// api/backup_api.ts - Backup API operations using axios
import axios, { AxiosRequestConfig } from 'axios';
import {
    CLOUD_PREPPER_BASE_URL,
    CLOUD_PREPPER_BACKUP_STATUS,
    CLOUD_PREPPER_BACKUP_DASHBOARD,
    CLOUD_PREPPER_BACKUP_LIST,
    CLOUD_PREPPER_BACKUP_GENERATE,
    CLOUD_PREPPER_BACKUP_DOWNLOAD,
    CLOUD_PREPPER_BACKUP_RESTORE
} from '../src/config/env';

// Types
export interface BackupFile {
    fileName: string;
    createdAt: string;
    modifiedAt: string;
    size: number;
    sizeFormatted: string;
    downloadUrl: string;
}

export interface BackupStatus {
    success: boolean;
    status: 'idle' | 'in_progress' | 'completed' | 'failed';
    lastBackup?: {
        fileName?: string;
        startTime?: string;
        endTime?: string;
        duration?: number;
        error?: string;
    };
}

export interface BackupDashboard {
    backup: {
        backupSystemEnabled: boolean;
        backupDirectory: string;
        totalBackups: number;
        lastBackupDate: string | null;
        totalBackupSize: number;
        oldestBackup: BackupFile | null;
        newestBackup: BackupFile | null;
        requestedBy: {
            user: string;
            role: string;
            timestamp: string;
        };
    };
    database: {
        size: string;
        schemas: Array<{
            schemaname: string;
            table_count: number;
            total_rows: number;
        }>;
    };
    recommendations: Array<{
        type: 'success' | 'warning' | 'info' | 'error';
        message: string;
        action: string | null;
    }>;
}

export interface BackupGeneration {
    success: boolean;
    message: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    timestamp: string;
    tables: Record<string, number>;
    downloadUrl: string;
}

export interface BackupListResponse {
    success: boolean;
    backups: BackupFile[];
    totalBackups: number;
}

export interface RestoreResponse {
    success: boolean;
    message: string;
    commandsExecuted: number;
    timestamp: string;
}

// Helper to create authenticated axios config
const createAuthConfig = (token: string): AxiosRequestConfig => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

/**
 * Get backup system status
 * Requires admin authentication
 */
export const getBackupStatus = async (token: string): Promise<BackupStatus> => {
    try {
        console.log('Fetching backup status...');
        const response = await axios.get<BackupStatus>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_STATUS}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error('Failed to fetch backup status:', err);
        throw err;
    }
};

/**
 * Get backup dashboard with detailed system information
 * Requires admin authentication
 */
export const getBackupDashboard = async (token: string): Promise<BackupDashboard> => {
    try {
        console.log('Fetching backup dashboard...');
        const response = await axios.get<BackupDashboard>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_DASHBOARD}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error('Failed to fetch backup dashboard:', err);
        throw err;
    }
};

/**
 * List all available backup files
 * Requires admin authentication
 */
export const listBackups = async (token: string): Promise<BackupFile[]> => {
    try {
        console.log('Listing backup files...');
        const response = await axios.get<BackupListResponse>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_LIST}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data.backups;
    } catch (err) {
        console.error('Failed to list backups:', err);
        throw err;
    }
};

/**
 * Generate a new database backup
 * Requires admin authentication
 */
export const generateBackup = async (token: string): Promise<BackupGeneration> => {
    try {
        console.log('Generating new backup...');
        const response = await axios.get<BackupGeneration>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_GENERATE}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error('Failed to generate backup:', err);
        throw err;
    }
};

/**
 * Download a backup file
 * Requires admin authentication
 * Returns a Blob that can be used to trigger download
 */
export const downloadBackup = async (token: string, fileName: string): Promise<Blob> => {
    try {
        console.log(`Downloading backup: ${fileName}`);
        const response = await axios.get(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_DOWNLOAD}/${fileName}`,
            {
                ...createAuthConfig(token),
                responseType: 'blob'
            }
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error('Failed to download backup:', err);
        throw err;
    }
};

/**
 * Restore database from a backup file
 * Requires admin authentication and confirmation password
 */
export const restoreBackup = async (
    token: string,
    fileName: string,
    confirmPassword: string
): Promise<RestoreResponse> => {
    try {
        console.log(`Restoring backup: ${fileName}`);
        const response = await axios.post<RestoreResponse>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_RESTORE}`,
            {
                fileName,
                confirmPassword
            },
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data;
    } catch (err) {
        console.error('Failed to restore backup:', err);
        throw err;
    }
};

/**
 * Helper function to trigger browser download from a blob
 */
export const triggerBlobDownload = (blob: Blob, fileName: string): void => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
