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
import { addBreadcrumb, captureException } from '../src/config/sentry';

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
        addBreadcrumb('backup', 'Fetching backup status', {});
        
        const response = await axios.get<BackupStatus>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_STATUS}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        addBreadcrumb('backup', 'Backup status fetched', {
            status: response.data.status,
            success: response.data.success
        });

        return response.data;
    } catch (err) {
        console.error('Failed to fetch backup status:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'get_backup_status',
            extra: {}
        });
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
        addBreadcrumb('backup', 'Fetching backup dashboard', {});
        
        const response = await axios.get<BackupDashboard>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_DASHBOARD}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        addBreadcrumb('backup', 'Backup dashboard fetched', {
            totalBackups: response.data.backup.totalBackups,
            enabled: response.data.backup.backupSystemEnabled
        });

        return response.data;
    } catch (err) {
        console.error('Failed to fetch backup dashboard:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'get_backup_dashboard',
            extra: {}
        });
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
        addBreadcrumb('backup', 'Listing backup files', {});
        
        const response = await axios.get<BackupListResponse>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_LIST}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        addBreadcrumb('backup', 'Backup files listed', {
            totalBackups: response.data.totalBackups
        });

        return response.data.backups;
    } catch (err) {
        console.error('Failed to list backups:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'list_backups',
            extra: {}
        });
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
        addBreadcrumb('backup', 'Generating new backup', {}, 'info');
        
        const response = await axios.get<BackupGeneration>(
            `${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_BACKUP_GENERATE}`,
            createAuthConfig(token)
        );

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        addBreadcrumb('backup', 'Backup generated successfully', {
            fileName: response.data.fileName,
            fileSize: response.data.fileSize,
            success: response.data.success
        }, 'info');

        return response.data;
    } catch (err) {
        console.error('Failed to generate backup:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'generate_backup',
            extra: {}
        });
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
        addBreadcrumb('backup', 'Downloading backup file', { fileName });
        
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

        addBreadcrumb('backup', 'Backup downloaded successfully', {
            fileName,
            blobSize: response.data.size
        });

        return response.data;
    } catch (err) {
        console.error('Failed to download backup:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'download_backup',
            extra: { fileName }
        });
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
        addBreadcrumb('backup', 'Restoring backup from file', { fileName }, 'warning');
        
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

        addBreadcrumb('backup', 'Backup restored successfully', {
            fileName,
            commandsExecuted: response.data.commandsExecuted,
            success: response.data.success
        }, 'info');

        return response.data;
    } catch (err) {
        console.error('Failed to restore backup:', err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'backup_api',
            action: 'restore_backup',
            extra: { fileName }
        });
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
