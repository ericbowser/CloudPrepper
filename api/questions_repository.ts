import axios from 'axios';
import type {Question} from "@/types/preptypes";
import {CLOUD_PREPPER_BASE_URL, CLOUD_PREPPER_ADD_QUESTION, CLOUD_PREPPER_UPDATE_QUESTION, CLOUD_PREPPER_GET_QUESTIONS} from '../env.json';

interface AllQuestionsResponse {
    comptiaQuestions: Question[];
    awsQuestions: Question[];
}

const addQuestion = async (question: Question): Promise<boolean> => {
    try {
        console.log('Sending post request');
        const response = await axios.post<Question>(`${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_ADD_QUESTION}`, {question});
        if (response.status === 200) {
            return true;
        }

        return false;
    } catch (err) {
        console.error("Failed to fetch questions from API:", err);
        throw err;
    }
};

const updateQuestion = async (question: Question): Promise<boolean> => {
    try {
        console.log('Sending post request');
        const response = await axios.post<Question>(`${CLOUD_PREPPER_BASE_URL}${CLOUD_PREPPER_UPDATE_QUESTION}`, {question});
        if (response.status === 200) {
            return true;
        }

        return false;
    } catch (err) {
        console.error("Failed to fetch questions from API:", err);
        throw err;
    }
};

const getQuestions = async (): Promise<AllQuestionsResponse> => {
    const cachedQuestions = localStorage.getItem('allQuestions');
    if (cachedQuestions) {
        console.log('Loading questions from cache...');
        return JSON.parse(cachedQuestions);
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

export {getQuestions, addQuestion};