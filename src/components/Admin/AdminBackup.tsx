// src/components/Admin/AdminBackup.tsx - Admin backup management interface
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBackupApi, BackupFile, BackupDashboard, BackupStatus } from '../../hooks/useBackupApi';
import { LoadingSpinner } from '../shared/LoadingSpinner';

// Status indicator component
const StatusIndicator: React.FC<{ 
    status: 'healthy' | 'warning' | 'error'; 
    text: string;
}> = ({ status, text }) => {
    const statusColors = {
        healthy: 'text-green-600 bg-green-100 border-green-300',
        warning: 'text-yellow-700 bg-yellow-100 border-yellow-300',
        error: 'text-red-600 bg-red-100 border-red-300'
    };

    const statusIcons = {
        healthy: '✓',
        warning: '⚠',
        error: '✗'
    };

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}>
            <span className="mr-1">{statusIcons[status]}</span>
            {text}
        </div>
    );
};

// File size formatter
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format date
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const AdminBackup: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const {
        loading,
        error,
        getBackupStatus,
        getBackupDashboard,
        listBackups,
        generateBackup,
        downloadBackup,
        restoreBackup,
        clearError
    } = useBackupApi();

    // State management
    const [activeTab, setActiveTab] = useState<'dashboard' | 'backups' | 'restore'>('dashboard');
    const [backupStatus, setBackupStatus] = useState<BackupStatus | null>(null);
    const [dashboard, setDashboard] = useState<BackupDashboard | null>(null);
    const [backupFiles, setBackupFiles] = useState<BackupFile[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showRestoreModal, setShowRestoreModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<BackupFile | null>(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    // Load initial data
    const loadData = useCallback(async () => {
        try {
            clearError();
            
            // Load backup status (public)
            const status = await getBackupStatus();
            setBackupStatus(status);

            // Load admin data if admin
            if (isAdmin) {
                const [dashboardData, files] = await Promise.all([
                    getBackupDashboard(),
                    listBackups()
                ]);
                setDashboard(dashboardData);
                setBackupFiles(files);
            }
        } catch (err) {
            console.error('Failed to load backup data:', err);
        }
    }, [getBackupStatus, getBackupDashboard, listBackups, isAdmin, clearError]);

    useEffect(() => {
        if (isAdmin) {
            loadData();
        }
    }, [loadData, isAdmin]);

    // Handle backup generation
    const handleGenerateBackup = async () => {
        if (!isAdmin) return;
        
        setIsGenerating(true);
        try {
            clearError();
            const result = await generateBackup();
            
            // Refresh the backup list
            const updatedFiles = await listBackups();
            setBackupFiles(updatedFiles);
            
            // Show success message
            alert(`Backup generated successfully!\nFile: ${result.fileName}\nSize: ${formatFileSize(result.fileSize)}`);
            
        } catch (err) {
            console.error('Failed to generate backup:', err);
            alert(`Failed to generate backup: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsGenerating(false);
        }
    };

    // Handle file download
    const handleDownload = async (file: BackupFile) => {
        try {
            clearError();
            await downloadBackup(file.fileName);
        } catch (err) {
            console.error('Download failed:', err);
            alert(`Download failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Handle restore
    const handleRestore = async () => {
        if (!selectedFile || !confirmPassword) return;

        try {
            clearError();
            await restoreBackup(selectedFile.fileName, confirmPassword);
            alert('Database restored successfully! Please refresh the page.');
            setShowRestoreModal(false);
            setSelectedFile(null);
            setConfirmPassword('');
        } catch (err) {
            console.error('Restore failed:', err);
            alert(`Restore failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Admin check
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
                <div className="text-center p-8 bg-white dark:bg-dark-800 rounded-lg shadow-lg">
                    <div className="text-red-600 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
                    <p className="text-gray-600 dark:text-gray-400">Admin privileges required to access backup system.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 font-burtons">
            {/* Header */}
            <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Database Backup Manager
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Manage CompTIA Prepper database backups and restore points
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {backupStatus && (
                                <StatusIndicator 
                                    status={backupStatus.systemHealth} 
                                    text={`System ${backupStatus.systemHealth}`}
                                />
                            )}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Logged in as: <span className="font-medium">{user?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {[
                            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                            { id: 'backups', name: 'Backup Files', icon: '💾' },
                            { id: 'restore', name: 'Restore', icon: '🔄' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                    Error
                                </h3>
                                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                    {error}
                                </div>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={clearError}
                                    className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {loading && (
                            <div className="flex justify-center py-12">
                                <LoadingSpinner size="lg" />
                            </div>
                        )}

                        {dashboard && (
                            <>
                                {/* System Overview Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Backups</h3>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {dashboard.backup.totalBackups}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available restore points</p>
                                    </div>

                                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Database Size</h3>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                            {dashboard.database.size}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current database</p>
                                    </div>

                                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backup Size</h3>
                                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                            {formatFileSize(dashboard.backup.totalBackupSize)}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total storage used</p>
                                    </div>

                                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Last Backup</h3>
                                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                            {dashboard.backup.lastBackupDate ? 
                                                formatDate(dashboard.backup.lastBackupDate) : 
                                                'Never'
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Most recent backup</p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={handleGenerateBackup}
                                            disabled={isGenerating}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <LoadingSpinner size="sm" />
                                                    <span className="ml-2">Generating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Create New Backup
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => setActiveTab('backups')}
                                            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            View All Backups
                                        </button>

                                        <button
                                            onClick={loadData}
                                            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Refresh Data
                                        </button>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                {dashboard.recommendations.length > 0 && (
                                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recommendations</h3>
                                        <div className="space-y-3">
                                            {dashboard.recommendations.map((rec, index) => (
                                                <div
                                                    key={index}
                                                    className={`p-3 rounded-lg border-l-4 ${
                                                        rec.type === 'success' ? 'bg-green-50 border-green-400 dark:bg-green-900/20' :
                                                        rec.type === 'warning' ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20' :
                                                        rec.type === 'info' ? 'bg-blue-50 border-blue-400 dark:bg-blue-900/20' :
                                                        'bg-red-50 border-red-400 dark:bg-red-900/20'
                                                    }`}
                                                >
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {rec.message}
                                                    </p>
                                                    {rec.action && (
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                            Action: {rec.action}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Database Schema Info */}
                                <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Database Schema Overview</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-dark-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Schema
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Tables
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Total Rows
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                {dashboard.database.schemas.map((schema) => (
                                                    <tr key={schema.schemaname}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {schema.schemaname}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {schema.table_count}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {schema.total_rows?.toLocaleString() || '0'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Backup Files Tab */}
                {activeTab === 'backups' && (
                    <div className="space-y-6">
                        {/* Actions Bar */}
                        <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Backup Files ({backupFiles.length})
                                </h3>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleGenerateBackup}
                                        disabled={isGenerating}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <LoadingSpinner size="sm" />
                                                <span className="ml-2">Generating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                New Backup
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={async () => {
                                            const files = await listBackups();
                                            setBackupFiles(files);
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Backup Files List */}
                        <div className="bg-white dark:bg-dark-800 rounded-lg shadow overflow-hidden">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : backupFiles.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No backups found</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create your first backup to get started.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-dark-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Filename
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Created
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Size
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {backupFiles.map((file) => (
                                                <tr key={file.fileName} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {file.fileName}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(file.createdAt)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {file.sizeFormatted}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleDownload(file)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                            </svg>
                                                            Download
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedFile(file);
                                                                setShowRestoreModal(true);
                                                            }}
                                                            className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"
                                                        >
                                                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                            Restore
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Restore Tab */}
                {activeTab === 'restore' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Database Restore</h3>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                            Warning: Database Restore Operation
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                            <p>Restoring a database backup will completely replace your current database with the backup data. This action cannot be undone. Please ensure you have a recent backup before proceeding.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {backupFiles.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No backup files available for restore.</p>
                                    <button
                                        onClick={() => setActiveTab('backups')}
                                        className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                    >
                                        Create a backup first →
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Select a backup file to restore from the list below:
                                    </p>
                                    <div className="grid gap-4">
                                        {backupFiles.map((file) => (
                                            <div
                                                key={file.fileName}
                                                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                            {file.fileName}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Created: {formatDate(file.createdAt)} • Size: {file.sizeFormatted}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFile(file);
                                                            setShowRestoreModal(true);
                                                        }}
                                                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                                                    >
                                                        Restore This Backup
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Restore Confirmation Modal */}
            {showRestoreModal && selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Confirm Database Restore
                            </h3>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    You are about to restore the database from:
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {selectedFile.fileName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Created: {formatDate(selectedFile.createdAt)}
                                </p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-3 mb-4">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    <strong>Warning:</strong> This will completely replace your current database. This action cannot be undone.
                                </p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type "CONFIRM_RESTORE_DATABASE" to proceed:
                                </label>
                                <input
                                    type="text"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-700 dark:text-white"
                                    placeholder="CONFIRM_RESTORE_DATABASE"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 dark:bg-dark-700 rounded-b-lg">
                            <button
                                onClick={() => {
                                    setShowRestoreModal(false);
                                    setSelectedFile(null);
                                    setConfirmPassword('');
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRestore}
                                disabled={confirmPassword !== 'CONFIRM_RESTORE_DATABASE' || loading}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors"
                            >
                                {loading ? 'Restoring...' : 'Restore Database'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBackup;
