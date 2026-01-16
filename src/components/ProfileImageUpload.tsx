import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CLOUD_PREPPER_BASE_URL } from '../config/env';
import { addBreadcrumb, captureException } from '../config/sentry';

interface ProfileImageUploadProps {
    currentAvatarUrl?: string | null;
    onUploadSuccess?: (avatarUrl: string) => void;
    className?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ 
    currentAvatarUrl, 
    onUploadSuccess,
    className = ''
}) => {
    const { user, token } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            setError('Please select a valid image file (JPEG, PNG, or WebP)');
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setError('Image must be smaller than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
            setError(null);
        };
        reader.readAsDataURL(file);

        // Upload immediately
        handleUpload(file);
    };

    const handleUpload = async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            addBreadcrumb('profile', 'Uploading profile image', {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
            });

            const response = await fetch(`${CLOUD_PREPPER_BASE_URL}/api/profile/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to upload image');
            }

            // Update preview with server URL
            const serverAvatarUrl = `${CLOUD_PREPPER_BASE_URL}${data.user.avatar_url}`;
            setPreviewUrl(serverAvatarUrl);
            
            addBreadcrumb('profile', 'Profile image uploaded successfully', {
                avatarUrl: data.user.avatar_url
            });
            
            // Call success callback if provided
            if (onUploadSuccess && data.user.avatar_url) {
                onUploadSuccess(data.user.avatar_url);
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
            setError(errorMessage);
            console.error('Upload error:', err);
            captureException(err instanceof Error ? err : new Error(String(err)), {
                component: 'ProfileImageUpload',
                action: 'upload_avatar',
                extra: { fileName: file.name }
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to remove your profile picture?')) {
            return;
        }

        setUploading(true);
        setError(null);

        try {
            addBreadcrumb('profile', 'Deleting profile image', {}, 'warning');
            
            const response = await fetch(`${CLOUD_PREPPER_BASE_URL}/api/profile/avatar`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to delete image');
            }

            setPreviewUrl(null);
            addBreadcrumb('profile', 'Profile image deleted successfully', {});
            
            // Call success callback with null
            if (onUploadSuccess) {
                onUploadSuccess('');
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete image';
            setError(errorMessage);
            console.error('Delete error:', err);
            captureException(err instanceof Error ? err : new Error(String(err)), {
                component: 'ProfileImageUpload',
                action: 'delete_avatar',
                extra: {}
            });
        } finally {
            setUploading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex flex-col items-center space-y-4 ${className}`}>
            {/* Avatar Preview */}
            <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {previewUrl ? (
                        <img 
                            src={previewUrl} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>{user?.username.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                
                {/* Hover Overlay */}
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleClick}
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                {/* Loading Spinner */}
                {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button
                    onClick={handleClick}
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>{previewUrl ? 'Change' : 'Upload'}</span>
                </button>

                {previewUrl && (
                    <button
                        onClick={handleDelete}
                        disabled={uploading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove</span>
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

            {/* Helper Text */}
            <p className="text-xs text-gray-500 text-center">
                Upload a profile picture (JPEG, PNG, or WebP, max 5MB)
            </p>
        </div>
    );
};

export default ProfileImageUpload;
