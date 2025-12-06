// src/hooks/useBackupApi.ts - Custom hook for backup API operations
import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as backupApi from '../../api/backup_api';

// Re-export types from backup_api for convenience
export type {
    BackupFile,
    BackupStatus,
    BackupDashboard,
    BackupGeneration
} from '../../api/backup_api';

export const useBackupApi = () => {
    const { token, isAdmin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Validate admin auth before making requests
    const validateAuth = useCallback(() => {
        if (!isAdmin || !token) {
            throw new Error('Admin authentication required');
        }
    }, [isAdmin, token]);

    // Get backup system status (admin only)
    const getBackupStatus = useCallback(async (): Promise<backupApi.BackupStatus> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            const data = await backupApi.getBackupStatus(token!);
            return data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch backup status';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    // Get backup dashboard (admin only)
    const getBackupDashboard = useCallback(async (): Promise<backupApi.BackupDashboard> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            const data = await backupApi.getBackupDashboard(token!);
            return data;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch backup dashboard';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    // List all backups (admin only)
    const listBackups = useCallback(async (): Promise<backupApi.BackupFile[]> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            const backups = await backupApi.listBackups(token!);
            return backups;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to list backups';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    // Generate new backup (admin only)
    const generateBackup = useCallback(async (): Promise<backupApi.BackupGeneration> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            const result = await backupApi.generateBackup(token!);
            return result;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to generate backup';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    // Download backup file (admin only)
    const downloadBackup = useCallback(async (fileName: string): Promise<void> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            const blob = await backupApi.downloadBackup(token!, fileName);
            backupApi.triggerBlobDownload(blob, fileName);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to download backup';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    // Restore from backup (admin only)
    const restoreBackup = useCallback(async (
        fileName: string,
        confirmPassword: string
    ): Promise<void> => {
        validateAuth();
        setLoading(true);
        setError(null);

        try {
            await backupApi.restoreBackup(token!, fileName, confirmPassword);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to restore backup';
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [token, validateAuth]);

    return {
        loading,
        error,
        getBackupStatus,
        getBackupDashboard,
        listBackups,
        generateBackup,
        downloadBackup,
        restoreBackup,
        clearError: () => setError(null),
    };
};
