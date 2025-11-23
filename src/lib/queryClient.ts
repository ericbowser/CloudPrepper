import { QueryClient } from '@tanstack/react-query';

const REACT_QUERY_CACHE_KEY = 'react-query-cache';

// Load React Query cache from sessionStorage
const loadCacheFromSessionStorage = (): Record<string, any> | null => {
  try {
    const cached = sessionStorage.getItem(REACT_QUERY_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn('Failed to load React Query cache from sessionStorage:', error);
  }
  return null;
};

// Save React Query cache to sessionStorage
const saveCacheToSessionStorage = (cacheData: Record<string, any>) => {
  try {
    sessionStorage.setItem(REACT_QUERY_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to save React Query cache to sessionStorage:', error);
    // If storage is full, try to clear old data
    try {
      sessionStorage.removeItem(REACT_QUERY_CACHE_KEY);
      sessionStorage.setItem(REACT_QUERY_CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {
      console.error('Failed to save cache even after clearing:', e);
    }
  }
};

// Create QueryClient with sessionStorage persistence
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Restore cache from sessionStorage on initialization
const cachedData = loadCacheFromSessionStorage();
if (cachedData) {
  try {
    // Restore all cached query data
    Object.entries(cachedData).forEach(([key, data]) => {
      try {
        const queryKey = JSON.parse(key);
        queryClient.setQueryData(queryKey, data);
      } catch (e) {
        // If key is not valid JSON, skip it
        console.warn('Invalid query key in cache:', key);
      }
    });
    console.log('React Query cache restored from sessionStorage');
  } catch (error) {
    console.warn('Failed to restore React Query cache:', error);
  }
}

// Persist cache to sessionStorage whenever it changes
let saveTimeout: NodeJS.Timeout | null = null;
queryClient.getQueryCache().subscribe((event) => {
  // Debounce saves to avoid excessive writes
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    const cache = queryClient.getQueryCache().getAll();
    const cacheData: Record<string, any> = {};
    
    // Save all queries that have data
    cache.forEach((query) => {
      if (query.state.data !== undefined && query.state.status === 'success') {
        const key = JSON.stringify(query.queryKey);
        cacheData[key] = query.state.data;
      }
    });
    
    if (Object.keys(cacheData).length > 0) {
      saveCacheToSessionStorage(cacheData);
    }
  }, 500); // Debounce by 500ms
});

// Clear React Query cache from sessionStorage on unload (graceful shutdown)
if (typeof window !== 'undefined') {
  const handleBeforeUnload = () => {
    // Clear the cache on graceful shutdown
    sessionStorage.removeItem(REACT_QUERY_CACHE_KEY);
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
}
