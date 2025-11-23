// React Query hooks for questions - integrates with existing QuestionContext
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuestions, addQuestion, updateQuestion } from '../../api/questions_repository';
import type { Question } from '@/types/preptypes';

interface AllQuestionsResponse {
  comptiaQuestions: Question[];
  awsQuestions: Question[];
}

// Query Keys - centralized for consistency
export const questionKeys = {
  all: ['questions'] as const,
  comptia: () => [...questionKeys.all, 'comptia'] as const,
  aws: () => [...questionKeys.all, 'aws'] as const,
};

// Main hook to fetch all questions with React Query caching
export const useQuestionsQuery = () => {
  return useQuery<AllQuestionsResponse>({
    queryKey: questionKeys.all,
    queryFn: async () => {
      const data = await getQuestions();
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - questions don't change frequently
    gcTime: 1000 * 60 * 30, // 30 minutes cache
  });
};

// Mutation for adding a new question
export const useAddQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (question: Question) => addQuestion(question),
    onMutate: async (newQuestion) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: questionKeys.all });

      // Snapshot previous value for rollback
      const previousQuestions = queryClient.getQueryData<AllQuestionsResponse>(questionKeys.all);

      return { previousQuestions };
    },
    onSuccess: async () => {
      // Invalidate and refetch questions
      await queryClient.invalidateQueries({ queryKey: questionKeys.all });
      // React Query cache is automatically persisted to sessionStorage
    },
    onError: (error, newQuestion, context) => {
      // Rollback on error
      if (context?.previousQuestions) {
        queryClient.setQueryData(questionKeys.all, context.previousQuestions);
      }
      console.error('Failed to add question:', error);
    },
  });
};

// Mutation for updating an existing question
export const useUpdateQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, updates }: { questionId: number; updates: Question & { certification?: 'comptia' | 'aws' } }) => {
      // Map questionId to question_id for consistency with underlying API
      return updateQuestion(questionId, updates);
    },
    onMutate: async ({ questionId, updates }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: questionKeys.all });

      // Snapshot previous value
      const previousQuestions = queryClient.getQueryData<AllQuestionsResponse>(questionKeys.all);

      // Optimistically update
      if (previousQuestions) {
        // Determine certification from updates.certification or infer from domain
        const certification = (updates as any).certification || 
          (updates.domain?.toLowerCase().includes('aws') ? 'aws' : 'comptia');
        
        const updateArray = (questions: Question[]) =>
          questions.map(q => q.question_id === questionId ? { ...q, ...updates } : q);

        queryClient.setQueryData<AllQuestionsResponse>(questionKeys.all, {
          comptiaQuestions: certification === 'comptia' 
            ? updateArray(previousQuestions.comptiaQuestions)
            : previousQuestions.comptiaQuestions,
          awsQuestions: certification === 'aws'
            ? updateArray(previousQuestions.awsQuestions)
            : previousQuestions.awsQuestions,
        });
      }

      return { previousQuestions };
    },
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: questionKeys.all });
      // React Query cache is automatically persisted to sessionStorage
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousQuestions) {
        queryClient.setQueryData(questionKeys.all, context.previousQuestions);
      }
      console.error('Update failed:', error);
    },
  });
};

// Hook to get questions for a specific certification
export const useQuestionsByCertification = (certification: 'comptia' | 'aws') => {
  const { data, ...rest } = useQuestionsQuery();

  return {
    ...rest,
    data: certification === 'comptia' ? data?.comptiaQuestions : data?.awsQuestions,
  };
};
