// src/components/Debug/CacheDebugger.tsx
// Temporary debugging component to visualize cache state
// Remove this after bugs are fixed

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const CacheDebugger: React.FC = () => {
    const queryClient = useQueryClient();
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    const localStorageKeys = Object.keys(localStorage);
    
    return (
        <div 
            className="fixed bottom-4 right-4 bg-black/95 text-white p-4 rounded-lg 
                       max-w-md max-h-96 overflow-auto text-xs font-mono z-50 
                       border-2 border-cyan-500 shadow-2xl"
        >
            <div className="flex justify-between items-center mb-3 border-b border-cyan-500 pb-2">
                <h3 className="font-bold text-cyan-400 text-sm">🔍 Cache Debugger</h3>
                <button
                    onClick={() => {
                        if (window.confirm('Clear ALL caches and reload?')) {
                            queryClient.clear();
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                    title="Nuclear option - clears everything"
                >
                    🔥 Nuclear Reset
                </button>
            </div>
            
            {/* React Query Cache Status */}
            <div className="mb-3">
                <strong className="text-yellow-400">⚡ React Query Cache:</strong>
                <ul className="mt-1 space-y-1">
                    {queries.length === 0 ? (
                        <li className="text-gray-400">No queries cached</li>
                    ) : (
                        queries.map((query, i) => (
                            <li key={i} className="pl-2">
                                <span className="text-green-400">
                                    {JSON.stringify(query.queryKey)}
                                </span>
                                {' - '}
                                <span 
                                    className={
                                        query.state.status === 'success' ? 'text-green-400' :
                                        query.state.status === 'error' ? 'text-red-400' :
                                        'text-yellow-400'
                                    }
                                >
                                    {query.state.status}
                                </span>
                                {query.state.dataUpdatedAt && (
                                    <span className="text-gray-400 ml-2">
                                        {new Date(query.state.dataUpdatedAt).toLocaleTimeString()}
                                    </span>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
            
            {/* localStorage Keys */}
            <div className="mb-3">
                <strong className="text-purple-400">💾 localStorage Keys:</strong>
                <ul className="mt-1 space-y-1">
                    {localStorageKeys.length === 0 ? (
                        <li className="text-gray-400">No keys in localStorage</li>
                    ) : (
                        localStorageKeys.map(key => {
                            const value = localStorage.getItem(key);
                            const size = value ? (value.length / 1024).toFixed(2) : '0';
                            const isOld = key === 'allQuestions' || key === 'cloudPrepQuizState';
                            
                            return (
                                <li key={key} className="pl-2 flex justify-between">
                                    <span className={isOld ? 'text-red-400' : 'text-blue-400'}>
                                        {key}
                                        {isOld && ' ⚠️'}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                        {size} KB
                                    </span>
                                </li>
                            );
                        })
                    )}
                </ul>
                {localStorageKeys.includes('allQuestions') && (
                    <div className="mt-2 p-2 bg-red-900/30 border border-red-500 rounded">
                        <p className="text-red-300 text-xs">
                            ⚠️ 'allQuestions' key exists - this should be removed!
                        </p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-cyan-500">
                <button
                    onClick={() => {
                        localStorage.removeItem('allQuestions');
                        localStorage.removeItem('cloudPrepQuizState');
                        alert('Old cache keys removed!');
                        window.location.reload();
                    }}
                    className="flex-1 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs"
                >
                    🗑️ Clear Old Keys
                </button>
                
                <button
                    onClick={async () => {
                        await queryClient.invalidateQueries();
                        alert('React Query cache invalidated!');
                    }}
                    className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                >
                    ♻️ Invalidate RQ
                </button>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700 text-gray-400 text-[10px]">
                <p>💡 Tip: This debugger is only visible in development mode</p>
            </div>
        </div>
    );
};

// Usage: Add to App.tsx or AdminPage.tsx temporarily
// {import.meta.env.DEV && <CacheDebugger />}
