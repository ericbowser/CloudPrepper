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
const transformDbRowToQuestion = (row: QuestionRow): {
    id: number;
    questionNumber: number;
    category: string;
    difficulty: "Knowledge" | "Comprehension" | "Application" | "Analysis" | "Expert" | "Beginner" | "Intermediate" | "Advanced";
    domain: "Domain 1" | "Domain 2" | "Domain 3" | "Domain 4" | "Domain 5" | "Domain 6" | "Domain 1: Design Resilient Architectures" | "Domain 2: Design Secure Architectures" | "Domain 3: Design High-Performing Architectures" | "Domain 4: Design Cost-Optimized Architectures" | string;
    questionText: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
    explanationDetails: ExplanationDetails | null;
    children: undefined;
    isCurrentQuestion: boolean;
    onClick: () => void
} => {
    // Parse options if they're stored as JSON string, otherwise use as-is
    const options: QuestionOption[] = safeJsonParse<QuestionOption[]>(row.options) || [];

    // Parse explanation_details if they're stored as JSON string
    const explanationDetails: ExplanationDetails | null = safeJsonParse<ExplanationDetails>(row.explanation_details) || null;

    return {
        id: row.question_id,
        questionNumber: row.question_number,
        category: row.category || '',
        difficulty: row.difficulty || 'Knowledge', // Default to 'Knowledge' to match your data
        domain: row.domain || '',
        questionText: row.question_text,
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
    certification?: 'comptia' | 'aws' | 'both';
    domain?: string | string[];
    category?: string;
    difficulty?: string;
    limit?: number;
    shuffle?: boolean;
}

async function getFilteredQuestions(filter: QuestionFilter): Promise<Question[]> {
    if (!connection) {
        connection = await connectLocalPostgres();
    }

    const params: (string | number | string[])[] = [];
    let paramIndex = 1;

    const comptiaQuery = 'SELECT * FROM "prepper".comptia_cloud_plus_questions';
    const awsQuery = 'SELECT * FROM "prepper".aws_certified_architect_associate_questions';
    
    let sql = '';

    if (filter.certification === 'comptia') {
        sql = comptiaQuery;
    } else if (filter.certification === 'aws') {
        sql = awsQuery;
    } else {
        sql = `(${comptiaQuery}) UNION ALL (${awsQuery})`;
    }

    const whereClauses: string[] = [];

    if (filter.domain) {
        whereClauses.push(Array.isArray(filter.domain) ? `domain = ANY($${paramIndex++})` : `domain = $${paramIndex++}`);
        params.push(filter.domain);
    }

    if (filter.category) {
        whereClauses.push(`category ILIKE $${paramIndex++}`);
        params.push(`%${filter.category}%`);
    }

    if (filter.difficulty) {
        whereClauses.push(`difficulty = $${paramIndex++}`);
        params.push(filter.difficulty);
    }

    if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql += filter.shuffle ? ' ORDER BY RANDOM()' : ' ORDER BY question_number';

    if (filter.limit) {
        sql += ` LIMIT $${paramIndex++}`;
        params.push(filter.limit);
    }

    const result = await connection.query(sql, params);
    return result.rows.map((row: QuestionRow) => transformDbRowToQuestion(row));
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