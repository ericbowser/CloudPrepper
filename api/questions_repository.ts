import apiClient from './axios';
import type {Question} from "@/types/preptypes";
import {
    CLOUD_PREPPER_ADD_QUESTION,
    CLOUD_PREPPER_GET_QUESTIONS
} from '../src/config/env';
import { addBreadcrumb, captureException } from '../src/config/sentry';

interface AllQuestionsResponse {
    comptiaQuestions: Question[];
    awsQuestions: Question[];
}

const addQuestion = async (question: Question): Promise<Question> => {
    try {
        console.log('Sending POST request to add question');
        addBreadcrumb('api', 'Adding new question', {
            questionId: question.question_id,
            domain: question.domain,
            category: question.category
        });
        
        const response = await apiClient.post<Question>(CLOUD_PREPPER_ADD_QUESTION, {question});

        if (response.status === 201 && response.data) {
            addBreadcrumb('api', 'Question added successfully', {
                questionId: response.data.question_id,
                status: response.status
            });
            return response.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (err) {
        console.error("Failed to add question:", err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'questions_repository',
            action: 'add_question',
            extra: {
                questionId: question.question_id,
                domain: question.domain
            }
        });
        throw err;
    }
};

const updateQuestion = async (question_id: number, question: Question): Promise<Question> => {
    try {
        console.log('Sending PUT request to update question:', question_id);
        console.log('Auth token present:', !!sessionStorage.getItem('auth_token'));
        
        addBreadcrumb('api', 'Updating question', {
            questionId,
            domain: question.domain,
            category: question.category
        });
        
        // Match the pattern used by addQuestion: /api/questions/updateQuestion/{id}
        const response = await apiClient.put<Question>(`/api/questions/updateQuestion/${question_id}`, {question});
        
        if ((response.status === 200 || response.status === 201) && response.data) {
            addBreadcrumb('api', 'Question updated successfully', {
                questionId,
                status: response.status
            });
            return response.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (err) {
        console.error("Failed to update question:", err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'questions_repository',
            action: 'update_question',
            extra: {
                questionId,
                domain: question.domain
            }
        });
        if (err instanceof Error) {
            console.error("Error details:", err.message);
        }
        throw err;
    }
};

// Let React Query handle ALL caching
const getQuestions = async (): Promise<AllQuestionsResponse> => {
    try {
        console.log('Fetching questions from API...');
        addBreadcrumb('api', 'Fetching all questions', {});
        
        const response = await apiClient.get<AllQuestionsResponse>(CLOUD_PREPPER_GET_QUESTIONS);

        if (!response.data || !response.data.comptiaQuestions || !response.data.awsQuestions) {
            throw new Error("Invalid data structure returned from the questions API.");
        }

        addBreadcrumb('api', 'Questions fetched successfully', {
            comptiaCount: response.data.comptiaQuestions.length,
            awsCount: response.data.awsQuestions.length
        });

        return response.data;
    } catch (err) {
        console.error("Failed to fetch questions from API:", err);
        captureException(err instanceof Error ? err : new Error(String(err)), {
            component: 'questions_repository',
            action: 'get_questions',
            extra: {}
        });
        throw err;
    }
};

export {getQuestions, addQuestion, updateQuestion};