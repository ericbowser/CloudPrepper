import apiClient from './axios';
import type {Question} from "@/types/preptypes";
import {
    CLOUD_PREPPER_ADD_QUESTION,
    CLOUD_PREPPER_GET_QUESTIONS,
    CLOUD_PREPPER_UPDATE_QUESTION
} from '../src/config/env';

interface AllQuestionsResponse {
    comptiaQuestions: Question[];
    awsQuestions: Question[];
}

const addQuestion = async (question: Question): Promise<Question> => {
    try {
        console.log('Sending POST request to add question');
        const response = await apiClient.post<Question>(CLOUD_PREPPER_ADD_QUESTION, {question});

        if (response.status === 201 && response.data) {
            return response.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (err) {
        console.error("Failed to add question:", err);
        throw err;
    }
};

const updateQuestion = async (question_id: number, question: Question): Promise<Question> => {
    try {
        console.log('Sending PUT request to update question:', question_id);
        console.log('Auth token present:', !!sessionStorage.getItem('auth_token'));
        const response = await apiClient.put<Question>(`${CLOUD_PREPPER_UPDATE_QUESTION}/${question_id}`, {question});
        
        if ((response.status === 200 || response.status === 201) && response.data) {
            return response.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (err) {
        console.error("Failed to update question:", err);
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
        const response = await apiClient.get<AllQuestionsResponse>(CLOUD_PREPPER_GET_QUESTIONS);

        if (!response.data || !response.data.comptiaQuestions || !response.data.awsQuestions) {
            throw new Error("Invalid data structure returned from the questions API.");
        }

        return response.data;
    } catch (err) {
        console.error("Failed to fetch questions from API:", err);
        throw err;
    }
};

export {getQuestions, addQuestion, updateQuestion};