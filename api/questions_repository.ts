import axios from 'axios';
import type { Question } from "@/types/preptypes";
import { ASSIST_BASE_URL, ASSIST_QUESTIONS } from '../env.json';

// Define a type for the expected API response data for better type safety.
interface AllQuestionsResponse {
	comptiaQuestions: Question[];
	awsQuestions: Question[];
}

/**
 * Fetches all questions from the backend API.
 * This function is designed to be called from the client-side (e.g., in a React component).
 * @returns A promise that resolves to an object containing both CompTIA and AWS questions.
 */
const getQuestions = async (): Promise<AllQuestionsResponse> => {
	try {
		// Use the generic to type the response data from axios
		const response = await axios.get<AllQuestionsResponse>(`${ASSIST_BASE_URL}${ASSIST_QUESTIONS}`);

		// Axios throws an error for non-2xx responses, so we mainly need to check if the data exists and has the correct shape.
		if (!response.data || !response.data.comptiaQuestions || !response.data.awsQuestions) {
			throw new Error("Invalid data structure returned from the questions API.");
		}

		return response.data;
	} catch (err) {
		console.error("Failed to fetch questions from API:", err);
		// Re-throw the error so the calling component (e.g., App.tsx) can handle it and update the UI.
		throw err;
	}
};

export default getQuestions;