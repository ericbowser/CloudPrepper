// data/questions_repository.ts - Typed version with PostgreSQL integration
import connectLocalPostgres from './postgres.js';
import type {
    QuestionRow,
    ComptiaQuestionRow,
    AwsQuestionRow,
    TransformedQuestion,
    QuestionOption,
    ExplanationDetails
} from '../src/types/database';
import type {Question} from '../src/types/preptypes';

let connection: any = null;

// Helper function to safely parse JSON if it's a string
const safeJsonParse = <T>(value: T | string): T | null => {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value) as T;
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            return null;
        }
    }
    return value as T;
};

// Type-safe transformer function
const transformDbRowToQuestion = (row: QuestionRow): Question => {
    // Parse options if they're stored as JSON string, otherwise use as-is
    const options: QuestionOption[] = safeJsonParse<QuestionOption[]>(row.options) || [];

    // Parse explanation_details if they're stored as JSON string
    const explanationDetails: ExplanationDetails | null = safeJsonParse<ExplanationDetails>(row.explanation_details);

    return {
        id: row.question_id,
        questionNumber: row.question_number,
        category: row.category || '',
        difficulty: row.difficulty || 'Knowledge', // Default to 'Knowledge' to match your data
        domain: row.domain || '',
        question: row.question_text,
        options: options,
        correctAnswer: row.correct_answer,
        explanation: row.explanation || '',
        explanationDetails: explanationDetails,
        children: undefined,
        isCurrentQuestion: false,
        onClick: () => console.log(`Question ${row.question_id} clicked`)
    };
};

async function getComptiaQuestions(): Promise<Question[]> {
    if (!connection) {
        connection = await connectLocalPostgres();
    }

    const sql = 'SELECT * FROM prepper.comptia_cloud_plus_questions ORDER BY question_number';

    try {
        const result = await connection.query(sql);
        console.log(`Loaded ${result.rows.length} CompTIA questions from database`);

        // Transform database rows to Question objects with type safety
        return result.rows.map((row: ComptiaQuestionRow) => transformDbRowToQuestion(row));
    } catch (error) {
        console.error('Error fetching CompTIA questions:', error);
        throw error;
    }
}

async function getAwsQuestions(): Promise<Question[]> {
    if (!connection) {
        connection = await connectLocalPostgres();
    }

    // FIXED: Query the correct AWS table, not the CompTIA table
    const sql = 'SELECT * FROM prepper.aws_certified_architect_associate_questions ORDER BY question_number';

    try {
        const result = await connection.query(sql);
        console.log(`Loaded ${result.rows.length} AWS questions from database`);

        // Transform database rows to Question objects with type safety
        return result.rows.map((row: AwsQuestionRow) => transformDbRowToQuestion(row));
    } catch (error) {
        console.error('Error fetching AWS questions:', error);
        throw error;
    }
}

// Helper function to get questions by domain with type safety
async function getQuestionsByDomain(
    certification: 'comptia' | 'aws',
    domain: string
): Promise<Question[]> {
    const questions = certification === 'comptia'
        ? await getComptiaQuestions()
        : await getAwsQuestions();

    return questions.filter(q => q.domain === domain);
}

// Helper function to get questions by category with type safety
async function getQuestionsByCategory(
    certification: 'comptia' | 'aws',
    category: string
): Promise<Question[]> {
    const questions = certification === 'comptia'
        ? await getComptiaQuestions()
        : await getAwsQuestions();

    return questions.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));
}

// Helper function to get questions by difficulty with type safety
async function getQuestionsByDifficulty(
    certification: 'comptia' | 'aws',
    difficulty: string
): Promise<Question[]> {
    const questions = certification === 'comptia'
        ? await getComptiaQuestions()
        : await getAwsQuestions();

    return questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
}

// Get random questions from either or both certifications
async function getRandomQuestions(
    count: number,
    includeComptia: boolean = true,
    includeAws: boolean = true
): Promise<Question[]> {
    let allQuestions: Question[] = [];

    if (includeComptia) {
        const comptiaQuestions = await getComptiaQuestions();
        allQuestions = [...allQuestions, ...comptiaQuestions];
    }

    if (includeAws) {
        const awsQuestions = await getAwsQuestions();
        allQuestions = [...allQuestions, ...awsQuestions];
    }

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Close database connection
async function closeConnection(): Promise<void> {
    if (connection) {
        await connection.end();
        connection = null;
    }
}

// Type-safe query builder for complex filtering
interface QuestionFilter {
    certification?: 'comptia' | 'aws';
    domain?: string;
    category?: string;
    difficulty?: string;
    limit?: number;
    shuffle?: boolean;
}

async function getFilteredQuestions(filter: QuestionFilter): Promise<Question[]> {
    let questions: Question[] = [];

    // Get base question set
    if (!filter.certification || filter.certification === 'comptia') {
        const comptiaQuestions = await getComptiaQuestions();
        questions = [...questions, ...comptiaQuestions];
    }

    if (!filter.certification || filter.certification === 'aws') {
        const awsQuestions = await getAwsQuestions();
        questions = [...questions, ...awsQuestions];
    }

    // Apply filters
    if (filter.domain) {
        questions = questions.filter(q => q.domain === filter.domain);
    }

    if (filter.category) {
        questions = questions.filter(q =>
            q.category.toLowerCase().includes(filter.category!.toLowerCase())
        );
    }

    if (filter.difficulty) {
        questions = questions.filter(q =>
            q.difficulty.toLowerCase() === filter.difficulty!.toLowerCase()
        );
    }

    // Shuffle if requested
    if (filter.shuffle) {
        questions = questions.sort(() => 0.5 - Math.random());
    }

    // Apply limit
    if (filter.limit && questions.length > filter.limit) {
        questions = questions.slice(0, filter.limit);
    }

    return questions;
}

export {
    getComptiaQuestions,
    getAwsQuestions,
    getQuestionsByDomain,
    getQuestionsByCategory,
    getQuestionsByDifficulty,
    getRandomQuestions,
    getFilteredQuestions,
    closeConnection,
    type QuestionFilter
};