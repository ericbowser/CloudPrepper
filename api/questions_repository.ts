import axios from 'axios';
import type { Question } from "@/types/preptypes";
import { ASSIST_BASE_URL, ASSIST_QUESTIONS } from '../env.json';

interface AllQuestionsResponse {
    comptiaQuestions: Question[];
    awsQuestions: Question[];
}

const getQuestions = async (): Promise<AllQuestionsResponse> => {
    const cachedQuestions = localStorage.getItem('allQuestions');
    if (cachedQuestions) {
        console.log('Loading questions from cache...');
        return JSON.parse(cachedQuestions);
    }

    try {
        console.log('Fetching questions from API...');
        const response = await axios.get<AllQuestionsResponse>(`${ASSIST_BASE_URL}${ASSIST_QUESTIONS}`);

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

export default getQuestions;