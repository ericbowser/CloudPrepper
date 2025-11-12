import axios from 'axios';
import type {Question} from "@/types/preptypes";
import {
    CLOUD_PREPPER_ADD_QUESTION,
    CLOUD_PREPPER_BASE_URL,
    CLOUD_PREPPER_GET_QUESTIONS,
    CLOUD_PREPPER_UPDATE_QUESTION
} from '../env.json';

interface AllQuestionsResponse {
    comptiaQuestions: Question[];
    awsQuestions: Question[];
}

const addQuestion = async (question: Question): Promise<Question> => {
    try {
        console.log('Sending POST request to add question');
        const response = await axios.post<Question>(`${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_ADD_QUESTION}`, {question});

        if (response.status === 201 && response.data) {
            // Clear localStorage cache to ensure fresh data on next fetch
            localStorage.removeItem('allQuestions');
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
        console.log('Sending PUT request to update question');
        const response = await axios.put<Question>(`${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_UPDATE_QUESTION}/${question_id}`, {question});
        
        if ((response.status === 200 || response.status === 201) && response.data) {
            // Clear localStorage cache to ensure fresh data on next fetch
            localStorage.removeItem('allQuestions');
            return response.data;
        }

        throw new Error(`Unexpected response status: ${response.status}`);
    } catch (err) {
        console.error("Failed to update question:", err);
        throw err;
    }
};

const getQuestions = async (): Promise<AllQuestionsResponse> => {
    const cachedQuestions = localStorage.getItem('allQuestions');
    if (cachedQuestions) {
        try {
            console.log('Loading questions from cache...');
            return JSON.parse(cachedQuestions);
        } catch (parseError) {
            console.warn('Failed to parse cached questions, fetching from API...', parseError);
            localStorage.removeItem('allQuestions');
        }
    }

    try {
        console.log('Fetching questions from API...');
        const response = await axios.get<AllQuestionsResponse>(`${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_GET_QUESTIONS}`);

        if (!response.data || !response.data.comptiaQuestions || !response.data.awsQuestions) {
            throw new Error("Invalid data structure returned from the questions API.");
        }

        localStorage.setItem('allQuestions', JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.error("Failed to fetch questions from API:", err);
        throw err;
    }
};

export {getQuestions, addQuestion, updateQuestion};