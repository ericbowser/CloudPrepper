// src/components/Admin/AdminDashboard.tsx - Main admin interface with backup integration
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminBackup from './AdminBackup';
import ExtractImageText from './ExtractImageText';
import ProtectedRoute from '../ProtectedRoute';
import { AdminNavBar } from '../shared/AdminNavBar';

type AdminSection = 'overview' | 'backup' | 'ocr' | 'questions' | 'users';

interface AdminDashboardProps {
    onNavigateHome?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
    const { user, isAdmin } = useAuth();
    const [activeSection, setActiveSection] = useState<AdminSection>('overview');

    const adminSections = [
        {
            id: 'overview' as const,
            name: 'Overview',
            icon: '📊',
            description: 'System overview and quick stats'
        },
        {
            id: 'backup' as const,
            name: 'Database Backup',
            icon: '💾',
            description: 'Manage database backups and restores'
        },
        {
            id: 'ocr' as const,
            name: 'OCR Tool',
            icon: '📸',
            description: 'Extract text from question images'
        },
        {
            id: 'questions' as const,
            name: 'Question Manager',
            icon: '❓',
            description: 'Add and edit exam questions'
        },
        {
            id: 'users' as const,
            name: 'User Management',
            icon: '👥',
            description: 'Manage user accounts and permissions'
        }
    ];

    const OverviewSection: React.FC = () => (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                            👨‍💼
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Welcome back, {user?.username || user?.email}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            CompTIA Prepper Admin Dashboard - Manage your certification platform
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminSections.filter(section => section.id !== 'overview').map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="bg-white dark:bg-dark-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 p-6 text-left group hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-3xl">{section.icon}</div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {section.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {section.description}
                        </p>
                    </button>
                ))}
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white">
                                ✓
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Healthy</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                                📊
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Online</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-500 text-white">
                                🔄
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Backup</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Ready</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Admin Activity</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    System started successfully
                                    <span className="text-gray-400 ml-2">Just now</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Admin dashboard accessed
                                    <span className="text-gray-400 ml-2">2 min ago</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Database connection verified
                                    <span className="text-gray-400 ml-2">5 min ago</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const OCRSection: React.FC = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">OCR Text Extraction</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Upload images of exam questions to extract text using OCR technology
                        </p>
                    </div>
                    <div className="text-4xl">📸</div>
                </div>
                <ExtractImageText />
            </div>
        </div>
    );

    const QuestionsSection: React.FC = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Question Manager Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Advanced question management features including bulk import, editing, and categorization will be available in the next update.
                    </p>
                </div>
            </div>
        </div>
    );

    const UsersSection: React.FC = () => (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        User Management Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        User account management, role assignments, and usage analytics will be available in the next update.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="min-h-screen bg-gray-50 dark:bg-dark-900 font-burtons">
                {/* Admin Navigation Bar */}
                <AdminNavBar onNavigateHome={onNavigateHome} />

                {/* Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {adminSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`${
                                        activeSection === section.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                                >
                                    <span>{section.icon}</span>
                                    <span>{section.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {activeSection === 'overview' && <OverviewSection />}
                    {activeSection === 'backup' && <AdminBackup />}
                    {activeSection === 'ocr' && <OCRSection />}
                    {activeSection === 'questions' && <QuestionsSection />}
                    {activeSection === 'users' && <UsersSection />}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminDashboard;
