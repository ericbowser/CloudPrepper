import { QueryClient } from '@tanstack/react-query';

/**
 * React Query Client Configuration
 * 
 * IMPORTANT: This configuration does NOT persist data across browser sessions.
 * All cached data is stored in memory and will be cleared when:
 * - The browser/tab is closed
 * - The page is refreshed
 * - The gcTime (garbage collection time) expires after the query becomes inactive
 * 
 * To enable persistence, you would need to add a persistence plugin like:
 * - @tanstack/react-query-persist-client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh
      gcTime: 1000 * 60 * 10, // 10 minutes - cache cleared after inactivity (reduced from 30)
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: false, // Don't refetch when reconnecting
      refetchOnMount: true, // Refetch on component mount if data is stale
    },
    mutations: {
      retry: 0, // Don't retry failed mutations
    },
  },
});
