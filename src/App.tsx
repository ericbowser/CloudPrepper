// src/App.tsx - Updated for caching and state persistence
import React, {useEffect, useState} from 'react';
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
import {AnswerModeToggle} from "./components/Answer/AnswerModeToggle";
import {getQuestions} from '../api/questions_repository';
import QuizResults from "./components/Quiz/QuizResults";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {CertificationSelection} from "./components/CertificationSelectionPage";
import {BeginQuiz} from "./components/Quiz/BeginQuiz";
import ExtractImageText from "./components/Admin/ExtractImageText";
import {useAuth} from "./contexts/AuthContext";
//TODO

const CACHE_KEY = 'cloudPrepQuizState';

const CloudPrepApp: React.FC = () => {
    // Get auth state
    const { isAdmin } = useAuth();

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

    // Current quiz questions and index
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizConfig, setCurrentQuizConfig] = useState<QuizConfig | null>(null);

    // Ref for explanation element
    const explanationRef = React.useRef<HTMLDivElement>(null);

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

        // Check if answer already exists for this question (avoid duplicates)
        const existingAnswerIndex = userAnswers?.findIndex(a => a.questionId === currentQuestion.question_id) ?? -1;
        if (existingAnswerIndex >= 0 && userAnswers) {
            // Update existing answer
            const updatedAnswers = [...userAnswers];
            updatedAnswers[existingAnswerIndex] = answerRecord;
            setUserAnswers(updatedAnswers);
        } else {
            // Add new answer
            setUserAnswers(prev => [...(prev || []), answerRecord]);
        }
        
        // In exam simulation mode, don't show feedback but mark as answered
        const isExamSimulation = currentQuizConfig?.examSimulationMode ?? false;
        if (!isExamSimulation) {
            setIsAnswered(isCorrect);
            
            if (answerMode === AnswerMode.inline) {
                setShowExplanation(true);
                // Scroll to explanation after a brief delay to allow render
                setTimeout(() => {
                    explanationRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        } else {
            // In exam simulation, mark as answered (use a special value to indicate submitted but no feedback)
            // We'll use true as a sentinel value, but won't show UI feedback
            setIsAnswered(true);
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
        const isExamSimulation = currentQuizConfig?.examSimulationMode ?? false;
        
        // If in exam simulation mode and current question hasn't been answered, submit it first
        if (isExamSimulation && selectedAnswers.length > 0) {
            const currentAnswerExists = userAnswers?.some(a => a.questionId === currentQuestion.question_id);
            if (!currentAnswerExists) {
                // Submit the answer first, then proceed
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

                // Add/update answer
                const existingAnswerIndex = userAnswers?.findIndex(a => a.questionId === currentQuestion.question_id) ?? -1;
                if (existingAnswerIndex >= 0 && userAnswers) {
                    const updatedAnswers = [...userAnswers];
                    updatedAnswers[existingAnswerIndex] = answerRecord;
                    setUserAnswers(updatedAnswers);
                } else {
                    setUserAnswers(prev => [...(prev || []), answerRecord]);
                }
            }
        }
        
        proceedToNextQuestion();
    };
    
    const proceedToNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            const nextIndex = currentQuestionIndex + 1;
            const nextQuestionData = currentQuizQuestions[nextIndex];
            const answerData = userAnswers?.find(a => a.questionId === nextQuestionData.question_id);
            const isExamSimulation = currentQuizConfig?.examSimulationMode ?? false;

            setCurrentQuestionIndex(nextIndex);
            setQuestionStartTime(new Date());
            if (answerData) {
                setSelectedAnswers(answerData.selectedAnswers);
                // In exam simulation, don't show if answer was correct/incorrect
                if (isExamSimulation) {
                    setIsAnswered(true); // Mark as answered but don't show feedback
                    setShowExplanation(false);
                } else {
                    setIsAnswered(answerData.isCorrect);
                    setShowExplanation(true);
                }
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

    const ocrModal = showOcr && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative bg-pastel-mintlight dark:bg-dark-900 p-4 rounded-lg shadow-lg max-w-3xl w-full">
                <ExtractImageText/>
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
                    {isAdmin && (
                        <button
                            onClick={() => setShowOcr(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            OCR Tool
                        </button>
                    )}
                </Header>
                <CertificationSelection
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
        const baseClasses = "bg-pastel-lightGreen w-full text-left p-2.5 rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md ";
        const isExamSimulation = currentQuizConfig?.examSimulationMode ?? false;

        // In exam simulation mode, never show correct/incorrect borders - only show selection
        if (isExamSimulation) {
            if (selectedAnswers.includes(option.text)) {
                return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-blue-100 dark:shadow-blue-900/50`;
            }
            return `${baseClasses} border-blue-400 dark:border-gray-600  dark:bg-dark-900 hover:border-blue-300 hover:bg-blue-25 dark:hover:bg-dark-700 hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-800`;
        }

        // Normal mode - show feedback
        if (isAnswered !== null) {
            const isSelected = selectedAnswers.includes(option.text);
            if (option.isCorrect) {
                return `${baseClasses} border-green-500 bg-pastel-green dark:bg-green-900/30 dark:border-green-600 shadow-green-100 dark:shadow-green-900/50`;
            }
            if (isSelected && !option.isCorrect) {
                return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-600 shadow-red-100 dark:shadow-red-900/50`;
            }
            return `${baseClasses} border-gray-300 dark:border-gray-600 bg-pastel-mint dark:bg-dark-900 opacity-75`;
        }

        if (selectedAnswers.includes(option.text)) {
            return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-blue-100 dark:shadow-blue-900/50`;
        }

        return `${baseClasses} border-blue-400 dark:border-gray-600  dark:bg-dark-900 hover:border-blue-300 hover:bg-blue-25 dark:hover:bg-dark-700 hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-800`;
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

                {isAdmin && (
                    <button
                        onClick={() => setShowOcr(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium mr-4"
                    >
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        OCR Tool
                    </button>
                )}

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
            <div className="min-h-screen bg-pastel-cyan dark:bg-dark-900 overflow-x-hidden">
                <main className="max-w-7xl mx-auto py-3 px-2 sm:px-3 lg:px-4">
                    {activeSection === 'practice' && (
                        <BeginQuiz
                            certification={getCurrentCertification()}
                            onStartQuiz={handleStartQuiz}
                        />
                    )}
                    {activeSection === 'quiz' && currentQuestion && (
                        <div className="space-y-4 animate-fade-in w-full">
{/* Rest of your quiz component code continues unchanged... */}

export default CloudPrepApp;
