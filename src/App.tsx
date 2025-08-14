// src/App.tsx - Updated for PostgreSQL integration
import React, { useEffect, useState } from 'react';
import { AnswerMode, AnswerRecord, Question, QuizMode, SectionType, SelectedAnswer, CertificationData } from "./types/preptypes";
import { CERTIFICATIONS, updateCertificationWithQuestions } from "./config/domainConfig";
import { DomainQuestionSelection } from "./components/DomainQuestionSelection";
import ExplanationCard from "./components/ExplanationCard";
import { AnswerModeToggle } from "./components/AnswerModeToggle";
import {
	getComptiaQuestions,
	getAwsQuestions,
	getQuestionsByDifficulty,
	getQuestionsByCategory,
	getRandomQuestions
} from '../data/questions_repository.js';

const CloudPrepApp: React.FC = () => {
	// Certification management
	const [currentCertification, setCurrentCertification] = useState<'comptia' | 'aws'>('comptia');

	// Data loading state
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [loadedCertifications, setLoadedCertifications] = useState<CertificationData[]>([]);

	// Main application state
	const [activeSection, setActiveSection] = useState<SectionType>('question-selection');
	const [quizMode, setQuizMode] = useState<QuizMode>('quiz');

	// Quiz state
	const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
	const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
	const [quizStartTime, setQuizStartTime] = useState<Date>(new Date());
	const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
	const [isAnswered, setIsAnswered] = useState<boolean | null>(null);
	const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.inline);
	const [showExplanation, setShowExplanation] = useState<boolean>(false);
	const [doneStudying, setDoneStudying] = useState<boolean>(false);

	// Current quiz questions and index
	const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentQuizConfig, setCurrentQuizConfig] = useState<any>(null);

	// Tab switch monitoring for exam mode
	const [tabSwitchCount, setTabSwitchCount] = useState(0);

	// Get current question safely
	const currentQuestion = currentQuizQuestions[currentQuestionIndex];
	const totalQuestions = currentQuizQuestions.length;

	// Load questions from PostgreSQL on component mount
	useEffect(() => {
		loadQuestionsFromDatabase();
	}, []);

	const loadQuestionsFromDatabase = async () => {
		setIsLoading(true);
		setError(null);

		try {
			console.log('Loading questions from PostgreSQL...');

			// Load both certification question sets
			const [comptiaQuestions, awsQuestions] = await Promise.all([
				getComptiaQuestions(),
				getAwsQuestions()
			]);

			console.log(`Loaded ${comptiaQuestions.length} CompTIA questions`);
			console.log(`Loaded ${awsQuestions.length} AWS questions`);

			// Update certifications with loaded questions
			const updatedCertifications = [
				updateCertificationWithQuestions('comptia', comptiaQuestions),
				updateCertificationWithQuestions('aws', awsQuestions)
			];

			setLoadedCertifications(updatedCertifications);
			console.log('Questions loaded and certifications updated successfully');

		} catch (err) {
			console.error('Error loading questions:', err);
			setError(`Failed to load questions: ${err instanceof Error ? err.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Get current certification data
	const getCurrentCertification = (): CertificationData | undefined => {
		return loadedCertifications.find(cert => cert.id === currentCertification);
	};

	// Start a new quiz with questions from PostgreSQL
	const startQuiz = async (config: any) => {
		try {
			setCurrentQuizConfig(config);
			let questions: Question[] = [];

			// Get questions based on the configuration
			if (config.domains && config.domains.length > 0) {
				// Get questions from specific domains
				const currentCert = getCurrentCertification();
				if (currentCert) {
					const selectedDomains = currentCert.domains.filter(domain =>
						config.domains.includes(domain.id)
					);
					questions = selectedDomains.flatMap(domain => domain.questions);
				}
			} else if (config.category) {
				// Get questions by category
				questions = await getQuestionsByCategory(currentCertification, config.category);
			} else if (config.difficulty) {
				// Get questions by difficulty
				questions = await getQuestionsByDifficulty(currentCertification, config.difficulty);
			} else {
				// Get random questions
				const includeComptia = currentCertification === 'comptia' || config.includeComptia;
				const includeAws = currentCertification === 'aws' || config.includeAws;
				questions = await getRandomQuestions(config.count || 10, includeComptia, includeAws);
			}

			// Shuffle questions if needed
			if (config.shuffle !== false) {
				questions = questions.sort(() => 0.5 - Math.random());
			}

			// Limit to requested count
			if (config.count && questions.length > config.count) {
				questions = questions.slice(0, config.count);
			}

			console.log(`Starting quiz with ${questions.length} questions`);
			setCurrentQuizQuestions(questions);
			setCurrentQuestionIndex(0);
			setActiveSection('quiz');
			setQuizStartTime(new Date());
			setQuestionStartTime(new Date());
			setUserAnswers([]);
			setSelectedAnswer(null);
			setIsAnswered(null);
			setShowExplanation(false);

		} catch (err) {
			console.error('Error starting quiz:', err);
			setError(`Failed to start quiz: ${err instanceof Error ? err.message : 'Unknown error'}`);
		}
	};

	// Handle answer submission
	const handleAnswerSubmission = (answer: SelectedAnswer) => {
		const endTime = new Date();
		const timeSpent = endTime.getTime() - questionStartTime.getTime();

		const answerRecord: AnswerRecord = {
			questionId: currentQuestion.id,
			selectedAnswers: Array.isArray(answer) ? answer : [answer],
			isCorrect: checkAnswer(answer),
			timeSpent,
			timestamp: endTime
		};

		setUserAnswers(prev => [...prev, answerRecord]);
		setSelectedAnswer(answer);
		setIsAnswered(answerRecord.isCorrect);

		if (answerMode === AnswerMode.inline) {
			setShowExplanation(true);
		}
	};

	// Check if answer is correct
	const checkAnswer = (answer: SelectedAnswer): boolean => {
		if (!currentQuestion) return false;

		if (Array.isArray(answer)) {
			// Multiple correct answers
			const correctAnswers = currentQuestion.options
				.filter(option => option.isCorrect)
				.map(option => option.text);
			return answer.length === correctAnswers.length &&
				answer.every(a => correctAnswers.includes(a));
		} else {
			// Single correct answer
			const correctOption = currentQuestion.options.find(option => option.isCorrect);
			return correctOption ? correctOption.text === answer : false;
		}
	};

	// Navigate to next question
	const nextQuestion = () => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex(prev => prev + 1);
			setSelectedAnswer(null);
			setIsAnswered(null);
			setShowExplanation(false);
			setQuestionStartTime(new Date());
		} else {
			// Quiz completed
			setActiveSection('results');
		}
	};

	// Navigate to previous question
	const previousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(prev => prev - 1);
			setSelectedAnswer(null);
			setIsAnswered(null);
			setShowExplanation(false);
			setQuestionStartTime(new Date());
		}
	};

	// Reset quiz
	const resetQuiz = () => {
		setActiveSection('question-selection');
		setCurrentQuizQuestions([]);
		setCurrentQuestionIndex(0);
		setUserAnswers([]);
		setSelectedAnswer(null);
		setIsAnswered(null);
		setShowExplanation(false);
		setDoneStudying(false);
		setCurrentQuizConfig(null);
	};

	// Handle loading state
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-lg text-gray-600">Loading questions from database...</p>
				</div>
			</div>
		);
	}

	// Handle error state
	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md mx-auto p-6">
					<div className="text-red-600 mb-4">
						<svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">Database Connection Error</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						onClick={loadQuestionsFromDatabase}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						Retry Connection
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold text-gray-900">
								CompTIA Prepper - Cloud Tech Professional
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<select
								value={currentCertification}
								onChange={(e) => setCurrentCertification(e.target.value as 'comptia' | 'aws')}
								className="border border-gray-300 rounded-md px-3 py-1"
							>
								<option value="comptia">CompTIA Cloud+</option>
								<option value="aws">AWS Solutions Architect</option>
							</select>
							{activeSection !== 'question-selection' && (
								<button
									onClick={resetQuiz}
									className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
								>
									Back to Selection
								</button>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{activeSection === 'question-selection' && (
					<DomainQuestionSelection
						certification={getCurrentCertification()}
						onStartQuiz={startQuiz}
					/>
				)}

				{activeSection === 'quiz' && currentQuestion && (
					<div className="space-y-6">
						{/* Quiz Progress */}
						<div className="bg-white rounded-lg shadow p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-medium">
									Question {currentQuestionIndex + 1} of {totalQuestions}
								</h2>
								<div className="flex items-center space-x-2">
									<AnswerModeToggle answerMode={answerMode} setAnswerMode={setAnswerMode} />
								</div>
							</div>

							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full transition-all duration-300"
									style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
								></div>
							</div>
						</div>

						{/* Question Display */}
						<div className="bg-white rounded-lg shadow p-6">
							<div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  {currentQuestion.category}
                </span>
								<span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                  {currentQuestion.difficulty}
                </span>
								<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {currentQuestion.domain}
                </span>
							</div>

							<h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>

							<div className="space-y-3">
								{currentQuestion.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswerSubmission(option.text)}
										disabled={selectedAnswer !== null}
										className={`w-full text-left p-4 rounded-lg border transition-colors ${
											selectedAnswer === option.text
												? option.isCorrect
													? 'border-green-500 bg-green-50'
													: 'border-red-500 bg-red-50'
												: selectedAnswer !== null && option.isCorrect
													? 'border-green-500 bg-green-50'
													: 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
										}`}
									>
										{option.text}
									</button>
								))}
							</div>
						</div>

						{/* Explanation */}
						{showExplanation && currentQuestion && (
							<ExplanationCard question={currentQuestion} />
						)}

						{/* Navigation */}
						<div className="flex justify-between">
							<button
								onClick={previousQuestion}
								disabled={currentQuestionIndex === 0}
								className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>

							{selectedAnswer && (
								<button
									onClick={nextQuestion}
									className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
								>
									{currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
								</button>
							)}
						</div>
					</div>
				)}

				{activeSection === 'results' && (
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-2xl font-bold mb-6">Quiz Results</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">
									{Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100)}%
								</div>
								<div className="text-gray-600">Overall Score</div>
							</div>

							<div className="text-center">
								<div className="text-3xl font-bold text-green-600">
									{userAnswers.filter(a => a.isCorrect).length}
								</div>
								<div className="text-gray-600">Correct Answers</div>
							</div>

							<div className="text-center">
								<div className="text-3xl font-bold text-red-600">
									{userAnswers.filter(a => !a.isCorrect).length}
								</div>
								<div className="text-gray-600">Incorrect Answers</div>
							</div>
						</div>

						<div className="flex justify-center space-x-4">
							<button
								onClick={resetQuiz}
								className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
							>
								Start New Quiz
							</button>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default CloudPrepApp;