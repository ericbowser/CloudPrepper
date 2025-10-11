// src/App.tsx - Updated for caching and state persistence
import React, {useEffect, useMemo, useState} from 'react';
import {
    AnswerMode,
    AnswerRecord,
    CertificationData,
    Question,
    QuestionOptionData,
    QuizConfig,
    SectionType,
} from "./types/preptypes";
import {updateCertificationWithQuestions} from "./config/domainConfig";
import ExplanationCard from "./components/ExplanationCard";
import {AnswerModeToggle} from "./components/AnswerModeToggle";
import {getQuestions} from '../api/questions_repository';
import QuizResults from "./components/QuizResults";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {CertificationSelectionPage} from "./components/CertificationSelectionPage";
import {BeginQuiz} from "./components/BeginQuiz";
import OcrProcessor from "./components/OcrProcessor";
import {QuizTimer} from "./components/QuizTimer";
import Modal from "./components/Modal";
import QuestionManagement from "./components/QuestionManagement";

const CACHE_KEY = 'cloudPrepQuizState';

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
    const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);

    // Quiz state
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [userAnswers, setUserAnswers] = useState<AnswerRecord[] | null>(null);
    const [quizStartTime, setQuizStartTime] = useState<Date>(new Date());
    const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
    const [isAnswered, setIsAnswered] = useState<boolean | null>(null);
    const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.inline);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false);

    // Current quiz questions and index
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizConfig, setCurrentQuizConfig] = useState<QuizConfig | null>(null);

    // Timer state
    const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
    const [timerDuration, setTimerDuration] = useState<number>(0);
    const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

    // Timer countdown effect
    useEffect(() => {
        if (!timerEnabled || isTimerPaused || timerDuration <= 0 || activeSection !== 'quiz') return;

        const interval = setInterval(() => {
            setTimerDuration(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerEnabled, isTimerPaused, timerDuration, activeSection]);

    // Effect to load cached state on mount
    useEffect(() => {
        const cachedState = localStorage.getItem(CACHE_KEY);
        if (cachedState) {
            try {
                const parsedState = JSON.parse(cachedState);
                if (parsedState) {
                    setCurrentCertification(parsedState.currentCertification);
                    setActiveSection(parsedState.activeSection);
                    setCurrentQuizConfig(parsedState.currentQuizConfig);
                    setCurrentQuizQuestions(parsedState.currentQuizQuestions);
                    setCurrentQuestionIndex(parsedState.currentQuestionIndex);
                    setUserAnswers(parsedState.userAnswers);
                    setQuizStartTime(new Date(parsedState.quizStartTime));
                    setSelectedAnswers(parsedState.selectedAnswers);
                    setIsAnswered(parsedState.isAnswered);
                    setShowExplanation(parsedState.showExplanation);
                    setTimerEnabled(parsedState.timerEnabled || false);
                    setTimerDuration(parsedState.timerDuration || 0);
                    setIsTimerPaused(parsedState.isTimerPaused || false);
                }
            } catch (e) {
                console.error("Failed to parse cached state:", e);
                localStorage.removeItem(CACHE_KEY);
            }
        }

        loadQuestionsFromApi()
            .then(() => console.log('questions loaded'))
            .catch(err => console.log(err));
    }, []);

    // Effect to save state to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading && currentCertification) {
            const stateToCache = {
                currentCertification,
                activeSection,
                currentQuizConfig,
                currentQuizQuestions,
                currentQuestionIndex,
                userAnswers,
                quizStartTime: quizStartTime.toISOString(),
                selectedAnswers,
                isAnswered,
                showExplanation,
                timerEnabled,
                timerDuration,
                isTimerPaused,
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(stateToCache));
        }
    }, [
        currentCertification,
        activeSection,
        currentQuizConfig,
        currentQuizQuestions,
        currentQuestionIndex,
        userAnswers,
        quizStartTime,
        selectedAnswers,
        isAnswered,
        showExplanation,
        isLoading,
        timerEnabled,
        timerDuration,
        isTimerPaused
    ]);


    // Get current question safely
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const totalQuestions = currentQuizQuestions.length;

    // Load questions from PostgreSQL on component mount
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
            localStorage.removeItem(CACHE_KEY); // Clear previous cache
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
                alert('No questions found matching your criteria. Please try a different selection.');
                return;
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

            // Set timer configuration
            setTimerEnabled(config.timerEnabled || false);
            setTimerDuration(config.timerDuration || 0);
            setIsTimerPaused(false);

        } catch (err) {
            console.error('Error starting quiz:', err);
            setError(`Failed to start quiz: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    // Handle answer submission
    const handleOptionSelection = (optionText: string) => {
        if (isAnswered !== null) {
            setIsAnswered(null);
            setShowExplanation(false);
            setUserAnswers(prev => (prev || []).filter(ans => ans.questionId !== currentQuestion.question_id));
        }

        if (currentQuestion.multiple_answers) {
            setSelectedAnswers(prev =>
                prev.includes(optionText)
                    ? prev.filter(ans => ans !== optionText)
                    : [...prev, optionText]
            );
        } else {
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
            setShowExplanationModal(true);
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

        const correctSet = new Set(correctOptionsTexts);
        return selectedAnswers.every(answer => correctSet.has(answer));
    };

    // Navigate to next question
    const nextQuestion = () => {
        setShowExplanationModal(false);
        if (currentQuestionIndex < totalQuestions - 1) {
            const nextIndex = currentQuestionIndex + 1;
            const nextQuestionData = currentQuizQuestions[nextIndex];
            const answerData = userAnswers?.find(a => a.questionId === nextQuestionData.question_id);

            setCurrentQuestionIndex(nextIndex);
            setQuestionStartTime(new Date());
            if (answerData) {
                setSelectedAnswers(answerData.selectedAnswers);
                setIsAnswered(answerData.isCorrect);
                setShowExplanation(true);
            } else {
                setSelectedAnswers([]);
                setIsAnswered(null);
                setShowExplanation(false);
            }
        } else {
            setActiveSection('results');
        }
    };

    // Navigate to previous question
    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            const prevQuestionData = currentQuizQuestions[prevIndex];
            const answerData = userAnswers?.find(a => a.questionId === prevQuestionData.question_id);

            setCurrentQuestionIndex(prevIndex);
            setQuestionStartTime(new Date());
            if (answerData) {
                setSelectedAnswers(answerData.selectedAnswers);
                setIsAnswered(answerData.isCorrect);
                setShowExplanation(true);
            } else {
                setSelectedAnswers([]);
                setIsAnswered(null);
                setShowExplanation(false);
            }
        }
    };

    // Handle timer expiration
    const handleTimeUp = () => {
        setIsTimerPaused(true);
        // Auto-submit current answer if any
        if (selectedAnswers.length > 0 && isAnswered === null) {
            handleAnswerSubmission();
        }
        // Navigate to results
        setActiveSection('results');
    };

    // Submit quiz early
    const handleSubmitQuiz = () => {
        // Auto-submit current answer if any
        if (selectedAnswers.length > 0 && isAnswered === null) {
            handleAnswerSubmission();
        }
        setActiveSection('results');
    };

    // Reset quiz
    const resetQuiz = () => {
        localStorage.removeItem(CACHE_KEY);
        setCurrentCertification(null);
        setCurrentQuizQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers(null);
        setSelectedAnswers([]);
        setIsAnswered(null);
        setShowExplanation(false);
        setCurrentQuizConfig(null);
        setTimerEnabled(false);
        setTimerDuration(0);
        setIsTimerPaused(false);
        setActiveSection('practice'); // Go back to practice setup
    };

    const handleRestartQuiz = () => {
        if (currentQuizConfig) {
            const cert = getCurrentCertification();
            if (cert) startQuiz(currentQuizConfig, cert);
        }
    };

    const ocrModal = showOcr && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative bg-pastel-mintlight dark:bg-dark-900 p-4 rounded-lg shadow-lg max-w-3xl w-full">
                <OcrProcessor/>
                <button
                    onClick={() => setShowOcr(false)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                    X
                </button>
            </div>
        </div>
    );

    if (isLoading && !currentCertification) { // Show loading only if no cached cert
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

    if (error) {
        return (
            <div className="min-h-screen dark:bg-dark-600 bg-pastel-mint flex items-center justify-center font-burtons">
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
            <div className="dark:bg-dark-900 dark:text-white bg-gray-50 min-h-screen font-burtons">
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
        const baseClasses = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ";

        if (isAnswered !== null) {
            const isSelected = selectedAnswers.includes(option.text);
            if (option.isCorrect) {
                return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-600 shadow-green-100 dark:shadow-green-900/50`;
            }
            if (isSelected && !option.isCorrect) {
                return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-600 shadow-red-100 dark:shadow-red-900/50`;
            }
            return `${baseClasses} border-gray-300 dark:border-gray-600 bg-pastel-mint dark:bg-dark-900 opacity-75`;
        }

        if (selectedAnswers.includes(option.text)) {
            return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-blue-100 dark:shadow-blue-900/50`;
        }

        return `${baseClasses} border-gray-200 dark:border-gray-600 bg-pastel-mint dark:bg-dark-900 hover:border-blue-300 hover:bg-blue-25 dark:hover:bg-dark-700 hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-800`;
    };

    return (
        <div className="dark:bg-dark-900 dark:text-white bg-gray-50 text-black font-burtons">
            <Header title={`${getCurrentCertification()?.name} Prepper`}>
                {activeSection === 'quiz' && currentQuizQuestions.length > 0 && (
                    <>
                        {/* Timer in Navbar */}
                        {timerEnabled && timerDuration > 0 && (
                            <div
                                className="flex items-center space-x-2 bg-pastel-mintlight dark:bg-dark-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 mr-4">
                                <svg
                                    className={`w-5 h-5 ${isTimerPaused ? 'text-gray-400' : 'text-blue-600 dark:text-blue-400'}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-200">
                                    {Math.floor(timerDuration / 60)}:{(timerDuration % 60).toString().padStart(2, '0')}
                                </span>
                            </div>
                        )}

                        {/* Question Stats */}
                        <div
                            className="flex items-center space-x-4 bg-pastel-mintlight dark:bg-dark-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 mr-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Question:</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                    {currentQuestionIndex + 1}/{totalQuestions}
                                </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Answered:</span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                    {userAnswers?.length || 0}
                                </span>
                            </div>
                        </div>
                    </>
                )}

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
            {/*     {showQuestionForm ?
                <QuestionManagement>

                </QuestionManagement>
                : null}*/}
            {activeSection === 'dashboard' &&
              <Dashboard userAnswers={userAnswers} length={totalQuestions}></Dashboard>
            }
            <div className="min-h-screen bg-pastel-cyan dark:bg-dark-900">
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {activeSection === 'practice' && (
                        <BeginQuiz
                            certification={getCurrentCertification()}
                            onStartQuiz={handleStartQuiz}
                        />
                    )}
                    {activeSection === 'quiz' && currentQuestion && (
                        <div className="space-y-8 animate-fade-in">
                            {/* Enhanced Header Card */}
                            <div
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl shadow-lg border border-blue-100 dark:border-dark-600 p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Question {currentQuestionIndex + 1}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {totalQuestions} questions total
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <AnswerModeToggle answerMode={answerMode} setAnswerMode={setAnswerMode}/>
                                    </div>
                                </div>

                                {/* Enhanced Progress Bar */}
                                <div className="space-y-3">
                                    <div
                                        className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <span>Progress</span>
                                        <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                                            style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Question Card */}
                            <div
                                className="bg-pastel-mintlight dark:bg-dark-900 rounded-2xl shadow-xl border border-red-50 dark:border-r-amber-600 overflow-hidden">
                                <div className="p-8">
                                    {/* Question Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            {currentQuestion.category}
                                        </span>
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-700">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            {currentQuestion.difficulty}
                                        </span>
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-700">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            {currentQuestion.domain}
                                        </span>
                                    </div>

                                    {/* Question Text */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl text-gray-900 dark:text-white leading-relaxed mb-4">
                                            {currentQuestion.question_text}
                                        </h3>
                                        {currentQuestion.multiple_answers && (
                                            <div
                                                className="flex items-center space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                                                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400"
                                                     fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd"
                                                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                                    Select all correct answers
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className={" m-8"}>

                                        {/* Answer Options */}
                                        <div className="space-y-4">
                                            {currentQuestion.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleOptionSelection(option.text)}
                                                    className={getOptionClassName(option)}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <div
                                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                                    selectedAnswers.includes(option.text)
                                                                        ? 'border-blue-500 bg-blue-500'
                                                                        : 'border-gray-300 dark:border-gray-600'
                                                                }`}>
                                                                {selectedAnswers.includes(option.text) && (
                                                                    <svg className="w-3 h-3 text-white"
                                                                         fill="currentColor"
                                                                         viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd"
                                                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                              clipRule="evenodd"/>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 text-left">
                                                            <p className="mt-1 text-gray-900 dark:text-white">
                                                                {option.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* Explanation Card - Only show if NOT inline mode or modal is closed */}
                            {showExplanation && isAnswered !== null && answerMode !== AnswerMode.inline && (
                                <ExplanationCard question={currentQuestion}/>
                            )}

                            {/* Explanation Modal - Only for inline mode */}
                            {answerMode === AnswerMode.inline && showExplanationModal && isAnswered !== null && (
                                <Modal
                                    isOpen={showExplanationModal}
                                    onClose={() => setShowExplanationModal(false)}
                                    title={isAnswered ? "✓ Correct Answer!" : "✗ Incorrect Answer"}
                                >
                                    <div className="space-y-4">
                                        <ExplanationCard question={currentQuestion} showInModal={false}/>

                                        <div
                                            className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                                            <button
                                                onClick={() => {
                                                    setShowExplanationModal(false);
                                                    nextQuestion();
                                                }}
                                                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                                            >
                                                {currentQuestionIndex === totalQuestions - 1 ? (
                                                    <>
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                                             viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M9 12l2 2 4-4"/>
                                                        </svg>
                                                        Finish Quiz
                                                    </>
                                                ) : (
                                                    <>
                                                        Continue
                                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
                                                             viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                            )}

                            {/* Enhanced Navigation */}
                            <div
                                className="flex justify-between items-center bg-pastel-mintlight dark:bg-dark-900 rounded-2xl p-6 border border-gray-200 dark:border-dark-600">
                                <button
                                    onClick={previousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-pastel-mintlight dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    Previous
                                </button>

                                <div className="text-center flex flex-col items-center space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedAnswers.length > 0 && isAnswered === null
                                            ? `${selectedAnswers.length} answer${selectedAnswers.length > 1 ? 's' : ''} selected`
                                            : isAnswered !== null
                                                ? (isAnswered ? '✓ Correct' : '✗ Incorrect')
                                                : 'Select your answer'
                                        }
                                    </p>
                                    <button
                                        onClick={handleSubmitQuiz}
                                        className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        Submit Quiz
                                    </button>
                                </div>

                                {isAnswered === null ? (
                                    <button
                                        onClick={handleAnswerSubmission}
                                        disabled={selectedAnswers.length === 0}
                                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-none font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12l2 2 4-4"/>
                                        </svg>
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-medium"
                                    >
                                        {currentQuestionIndex === totalQuestions - 1 ? (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 12l2 2 4-4"/>
                                                </svg>
                                                Finish Quiz
                                            </>
                                        ) : (
                                            <>
                                                Next Question
                                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </>
                                        )}
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
