// src/App.tsx - Updated for PostgreSQL integration
import React, {useEffect, useState} from 'react';
import {
    AnswerMode,
    AnswerRecord,
    CertificationData,
    Question, QuestionOptionData,
    QuizConfig,
    SectionType,
} from "./types/preptypes";
import {updateCertificationWithQuestions} from "./config/domainConfig";
import ExplanationCard from "./components/ExplanationCard";
import {AnswerModeToggle} from "./components/AnswerModeToggle";
import getQuestions from '../api/questions_repository';
import QuizResults from "./components/QuizResults";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {CertificationSelectionPage} from "./components/CertificationSelectionPage";
import {PracticeSetup} from "./components/PracticeSetup";
import OcrProcessor from "./components/OcrProcessor";

const CloudPrepApp: React.FC = () => {
    // Certification management
    const [currentCertification, setCurrentCertification] = useState<'comptia' | 'aws' | null>(null);

    // Data loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadedCertifications, setLoadedCertifications] = useState<CertificationData[]>([]);

    // Main application state
    const [activeSection, setActiveSection] = useState<SectionType | string>('quiz');
    const [showOcr, setShowOcr] = useState<boolean>(false);

    // Quiz state
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [userAnswers, setUserAnswers] = useState<AnswerRecord[] | null>(null);
    const [quizStartTime, setQuizStartTime] = useState<Date>(new Date());
    const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
    const [isAnswered, setIsAnswered] = useState<boolean | null>(null);
    const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.inline);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    // Current quiz questions and index
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizConfig, setCurrentQuizConfig] = useState<QuizConfig | null>(null);

    // Tab switch monitoring for exam mode

    // Get current question safely
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const totalQuestions = currentQuizQuestions.length;

    // Load questions from PostgreSQL on component mount
    useEffect(() => {
        loadQuestionsFromApi();
    }, []);
    const loadQuestionsFromApi = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Loading questions from API...');

            // Load both certification question sets
            const {comptiaQuestions, awsQuestions} = await getQuestions();

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
            setError(`Failed to load questions. ${err instanceof Error ? err.message : 'Please check the API connection and try again.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Get current certification data
    const getCurrentCertification: () => CertificationData | undefined = (): CertificationData | undefined => {
        return loadedCertifications.find(cert => cert.id === currentCertification);
    };

    const handleStartQuiz = (config: QuizConfig) => {
        const cert = loadedCertifications.find(c => c.id === config.certification);
        if (cert) {
            setCurrentCertification(cert.id);
            startQuiz(config, cert);
        }
    };

    // Start a new quiz with questions from PostgreSQL
    const startQuiz = (config: QuizConfig, currentCert: CertificationData) => {
        try {
            setCurrentQuizConfig(config);

            let questions: Question[] = [];

            // 1. Get base set of questions from selected domains
            if (config.selectedDomains.includes('all')) {
                questions = currentCert.domains.flatMap(domain => domain.questions);
            } else {
                questions = currentCert.domains
                    .filter(domain => config.selectedDomains.includes(domain.id))
                    .flatMap(domain => domain.questions);
            }

            // Shuffle questions
            questions = questions.sort(() => 0.5 - Math.random());

            // Limit to requested count
            if (config.questionCount && questions.length > config.questionCount) {
                questions = questions.slice(0, config.questionCount);
            }

            if (questions.length === 0) {
                // Handle the case where no questions match the filter criteria to prevent an empty quiz.
                // We can reset the section to question-selection and show an alert or a message.
                alert('No questions found matching your criteria. Please try a different selection.');
                return; // Do not start the quiz
            }

            console.log(`Starting quiz with ${questions.length} questions`);
            setCurrentQuizQuestions(questions);
            setCurrentQuestionIndex(0);
            setActiveSection("quiz");
            setQuizStartTime(new Date());
            setQuestionStartTime(new Date());
            setUserAnswers([]);
            setSelectedAnswers([]);
            setIsAnswered(null);
            setShowExplanation(false);

        } catch (err) {
            console.error('Error starting quiz:', err);
            setError(`Failed to start quiz: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Handle answer submission
    const handleOptionSelection = (optionText: string) => {
        if (currentQuestion.multiple_answers) {
            // Checkbox-style selection for multiple-answer questions
            setSelectedAnswers(prev =>
                prev.includes(optionText)
                    ? prev.filter(ans => ans !== optionText)
                    : [...prev, optionText]
            );
        } else {
            // Radio-button-style selection for single-answer questions
            setSelectedAnswers([optionText]);
        }
    };

    const handleAnswerSubmission = () => {
        if (selectedAnswers.length === 0) return;

        const endTime = new Date();
        const timeSpent = endTime.getTime() - questionStartTime.getTime();

        const isCorrect = checkAnswer();

        const answerRecord: AnswerRecord = {
            questionId: currentQuestion.question_id,
            selectedAnswers: selectedAnswers,
            isCorrect: isCorrect,
            timeSpent,
            timestamp: endTime
        };

        setUserAnswers(prev => [...(prev || []), answerRecord]);
        setIsAnswered(isCorrect);

        if (answerMode === AnswerMode.inline) {
            setShowExplanation(true);
        }
    };
    
    // Check if answer is correct
    const checkAnswer = (): boolean => {
        if (!currentQuestion) return false;

        const correctOptionsTexts = currentQuestion.options
            .filter(option => option.isCorrect)
            .map(option => option.text);

        if (selectedAnswers.length !== correctOptionsTexts.length) {
            return false;
        }

        // Use a Set for efficient lookup and to handle cases where array order differs
        const correctSet = new Set(correctOptionsTexts);
        return selectedAnswers.every(answer => correctSet.has(answer));
    };

    // Navigate to next question
    const nextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswers([]);
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
            setSelectedAnswers([]);
            setIsAnswered(null);
            setShowExplanation(false);
            setQuestionStartTime(new Date());
        }
    };

    // Reset quiz
    const resetQuiz = () => {
        setCurrentCertification(null);
        setCurrentQuizQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers(null);
        setSelectedAnswers([]);
        setIsAnswered(null);
        setShowExplanation(false);
        setCurrentQuizConfig(null);
    };

    const handleRestartQuiz = () => {
        if (currentQuizConfig) {
            const cert = getCurrentCertification();
            if (cert) startQuiz(currentQuizConfig, cert);
        }
    };

    const ocrModal = showOcr && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative bg-white dark:bg-dark-800 p-4 rounded-lg shadow-lg max-w-3xl w-full">
                <OcrProcessor />
                <button
                    onClick={() => setShowOcr(false)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                    X
                </button>
            </div>
        </div>
    );

    // Handle loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-burtons">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading questions from API...</p>
                </div>
                {ocrModal}
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-burtons">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Database Connection Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={loadQuestionsFromApi}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry Connection
                    </button>
                </div>
                {ocrModal}
            </div>
        );
    }

    if (!currentCertification) {
        return (
            <div className="dark:bg-dark-800 dark:text-white bg-gray-50 min-h-screen font-burtons">
                <Header title="Cloud Prepper">
                    <button
                        onClick={() => setShowOcr(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                        OCR Tool
                    </button>
                </Header>
                <CertificationSelectionPage
                    certifications={loadedCertifications}
                    onSelectCertification={(certId) => {
                        setCurrentCertification(certId);
                        setActiveSection('practice');
                    }}
                />
                {ocrModal}
            </div>
        );
    }

    const getOptionClassName: (option: QuestionOptionData) => string = (option: QuestionOptionData) => {
        const baseClasses = "w-full text-left p-4 rounded-lg border transition-colors dark:text-gray-200";

        if (isAnswered !== null) { // Answer has been submitted
            const isSelected = selectedAnswers.includes(option.text);
            if (option.isCorrect) {
                return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700`;
            }
            if (isSelected && !option.isCorrect) {
                return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700`;
            }
            return `${baseClasses} border-gray-300 dark:border-gray-600`; // Unselected, not correct
        }

        // Before answer is submitted
        if (selectedAnswers.includes(option.text)) {
            return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-400`; // Highlight selected
        }

        return `${baseClasses} border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-dark-600`;
    };

    return (
        <div className="dark:bg-dark-800 dark:text-white bg-gray-50 text-black font-burtons">
            <Header title={`${getCurrentCertification()?.name} Prepper`}>
                <button
                    onClick={() => setShowOcr(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium mr-4"
                >
                    OCR Tool
                </button>
                <button
                    onClick={resetQuiz}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                    Change Certification
                </button>
            </Header>
            {activeSection === 'dashboard' &&
              <Dashboard userAnswers={userAnswers} length={totalQuestions}></Dashboard>
            }
            <div className="min-h-screen bg-gray-100 dark:bg-dark-800">
                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {activeSection === 'practice' && (
                        <PracticeSetup
                            certification={getCurrentCertification()}
                            onStartQuiz={handleStartQuiz}
                        />
                    )}
                    {activeSection === 'quiz' && currentQuestion && (
                        <div className="space-y-6">
                            {/* Quiz Progress */}
                            <div className="bg-white dark:bg-dark-700 rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium">
                                        Question {currentQuestionIndex + 1} of {totalQuestions}
                                    </h2>
                                    <div className="flex items-center space-x-2 text-white">
                                        <AnswerModeToggle answerMode={answerMode} setAnswerMode={setAnswerMode}/>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}
                                    ></div>
                                </div>
                            </div>

                            {/* Question Display */}
                            <div className="bg-white dark:bg-dark-700 rounded-lg shadow p-6">
                                <div className="mb-4">
                                    <span
                                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                                      {currentQuestion.category}
                                    </span>
                                    <span
                                        className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2">
                                        {currentQuestion.difficulty}
                                    </span>
                                    <span
                                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                                        {currentQuestion.domain}
                                    </span>
                                </div>

                                <h3 className="text-lg font-medium mb-2">{currentQuestion.question_text}</h3>
                                {currentQuestion.multiple_answers && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                        (Select all that apply)
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleOptionSelection(option.text)}
                                            disabled={isAnswered !== null}
                                            className={getOptionClassName(option)}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Explanation */}
                            {showExplanation && currentQuestion && (
                                <ExplanationCard question={currentQuestion}/>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between">
                                <button
                                    onClick={previousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {isAnswered === null ? (
                                    <button
                                        onClick={handleAnswerSubmission}
                                        disabled={selectedAnswers.length === 0}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
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
                        <QuizResults
                            userAnswers={userAnswers}
                            questions={currentQuizQuestions}
                            onRestart={handleRestartQuiz}
                        />
                    )}
                </main>
            </div>
            {ocrModal}
        </div>
    );
};

export default CloudPrepApp;
