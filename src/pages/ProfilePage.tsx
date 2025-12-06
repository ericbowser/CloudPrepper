import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import ProfileImageUpload from '../components/ProfileImageUpload';

interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string;
    avatar_url: string | null;
    user_type?: string;
}

const ProfilePage: React.FC = () => {
    const { user, token } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const CLOUD_PREPPER_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:32636';

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${CLOUD_PREPPER_BASE_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to fetch profile');
            }

            setProfile(data.user);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
            setError(errorMessage);
            console.error('Profile fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpdate = (avatarUrl: string) => {
        if (profile) {
            setProfile({
                ...profile,
                avatar_url: avatarUrl || null
            });
        }
        // Refresh to update navigation
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <Navigation />
                <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                    <div className="flex flex-col items-center space-y-4">
                        <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-600 font-medium">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <Navigation />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Profile</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchProfile}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navigation />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Profile Header with Background */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    
                    {/* Profile Content */}
                    <div className="px-6 pb-6">
                        {/* Avatar Section - Overlapping the background */}
                        <div className="flex flex-col items-center -mt-16 mb-6">
                            <ProfileImageUpload
                                currentAvatarUrl={profile?.avatar_url}
                                onUploadSuccess={handleAvatarUpdate}
                            />
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Profile Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                            
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                                    {profile?.username}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                                    {profile?.email}
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account Role
                                </label>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                        profile?.role === 'admin' 
                                            ? 'bg-blue-100 text-blue-600' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Account Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-600 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">--</p>
                                            <p className="text-xs text-gray-600">Questions Completed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-indigo-600 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">--%</p>
                                            <p className="text-xs text-gray-600">Success Rate</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">-- hrs</p>
                                            <p className="text-xs text-gray-600">Study Time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                Change Password
                            </button>
                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                Notification Settings
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            More profile settings coming soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
