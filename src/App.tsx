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
import AdminDashboard from "./components/Admin/AdminDashboard";
import {useAuth} from "./contexts/AuthContext";
import {queryClient} from "./lib/queryClient";
import { shuffleArray } from './utils/shuffle'

// session storage
const CACHE_KEY = 'cloudPrepQuizState';

// Helper to normalize multiple_answers
const isMultipleAnswers = (value: boolean | number | string | undefined): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') return value === '1' || value === 'true';
    return false;
};

const clearAllCaches = () => {
    // Clear sessionStorage (quiz state and React Query cache)
    sessionStorage.removeItem('cloudPrepQuizState');
    sessionStorage.removeItem('react-query-cache');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    // Clear any leftover localStorage items (cleanup only)
    if (sessionStorage.getItem('auth_token')?.length) {
        sessionStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
    }
    console.log('All caches cleared');
};

const CloudPrepApp: React.FC = () => {
    // Get auth state
    const { isAdmin } = useAuth();

    // Certification management
    const [currentCertification, setCurrentCertification] = useState<'comptia' | 'aws' | null>(null);

    // Data loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadedCertifications, setLoadedCertifications] = useState<CertificationData[]>([]);
    const isLoadingRef = React.useRef<boolean>(false);

    // Main application state
    const [activeSection, setActiveSection] = useState<SectionType | string>('quiz');

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

    // Listen for admin navigation events from main nav
    useEffect(() => {
        const handleNavigateToAdmin = () => {
            setActiveSection('admin');
        };
        
        window.addEventListener('navigateToAdmin', handleNavigateToAdmin);
        
        return () => {
            window.removeEventListener('navigateToAdmin', handleNavigateToAdmin);
        };
    }, []);

    // Clean up on mount - only clear old localStorage (not sessionStorage)
    useEffect(() => {
        // Only clear old localStorage data (backward compatibility cleanup)
        // DO NOT clear sessionStorage - it should persist across page refreshes
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        
        // 🔄 RESTORE cached quiz state from sessionStorage (for logged-in users)
        const cachedState = sessionStorage.getItem(CACHE_KEY);
        if (cachedState) {
            try {
                const parsed = JSON.parse(cachedState);
                console.log('📦 Restoring cached quiz state from sessionStorage');
                
                // Restore all quiz state
                setCurrentCertification(parsed.currentCertification);
                // DON'T restore 'admin' section - always start fresh on route '/'
                const restoredSection = parsed.activeSection === 'admin' ? 'quiz' : parsed.activeSection;
                setActiveSection(restoredSection);
                setCurrentQuizConfig(parsed.currentQuizConfig);
                setCurrentQuizQuestions(parsed.currentQuizQuestions || []);
                setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
                setUserAnswers(parsed.userAnswers || null);
                setSelectedAnswers(parsed.selectedAnswers || []);
                setIsAnswered(parsed.isAnswered);
                setShowExplanation(parsed.showExplanation || false);
                setTimerEnabled(parsed.timerEnabled || false);
                setTimerDuration(parsed.timerDuration || 0);
                setIsTimerPaused(parsed.isTimerPaused || false);
                
                if (parsed.quizStartTime) {
                    setQuizStartTime(new Date(parsed.quizStartTime));
                }
                
                console.log('✅ Quiz state restored successfully');
            } catch (err) {
                console.error('Failed to restore cached state:', err);
                sessionStorage.removeItem(CACHE_KEY);
            }
        }
        
        // Load questions from API
        loadQuestionsFromApi()
            .then(() => console.log('questions loaded'))
            .catch(err => console.log(err));
    }, []);

    // Clean up on page unload - differentiate between logged-in and guest users
    useEffect(() => {
        const handleBeforeUnload = () => {
            // Check if user is logged in (has auth token in sessionStorage)
            const authToken = sessionStorage.getItem('auth_token');
            
            if (!authToken) {
                // Guest user - clear quiz state on page close
                console.log('🛡️ Guest user: Clearing quiz state on browser close');
                sessionStorage.removeItem('cloudPrepQuizState');
            } else {
                // Logged-in user - preserve quiz state for resume on refresh
                console.log('🔐 Logged-in user: Preserving quiz state');
                // Do NOT clear cloudPrepQuizState or auth tokens
            }
        };

        const handleUnload = () => {
            // Final cleanup - same logic as beforeunload
            const authToken = sessionStorage.getItem('auth_token');
            if (!authToken) {
                sessionStorage.removeItem('cloudPrepQuizState');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
        };
    }, []);

    // Effect to save state to sessionStorage whenever it changes (only during active session)
    useEffect(() => {
        // Don't cache if in admin section (admin has its own route at /admin)
        if (!isLoading && currentCertification && activeSection !== 'admin') {
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
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(stateToCache));
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
        // Prevent multiple simultaneous loads
        if (isLoadingRef.current) {
            console.log('Questions already loading, skipping duplicate load');
            return;
        }

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            console.log('Loading questions from API...');
            
            // Force fresh fetch by invalidating React Query cache first
            await queryClient.invalidateQueries({ queryKey: ['questions'] });
            await queryClient.refetchQueries({ queryKey: ['questions'] });

            // Load both certification question sets
            const {comptiaQuestions, awsQuestions} = await getQuestions();

            console.log(`📥 Raw API response - CompTIA: ${comptiaQuestions.length}, AWS: ${awsQuestions.length}`);

            // Deduplicate questions by question_id
            const uniqueComptia = Array.from(
                new Map(comptiaQuestions.map(q => [q.question_id, q])).values()
            );
            const uniqueAws = Array.from(
                new Map(awsQuestions.map(q => [q.question_id, q])).values()
            );

            const duplicateComptia = comptiaQuestions.length - uniqueComptia.length;
            const duplicateAws = awsQuestions.length - uniqueAws.length;

            if (duplicateComptia > 0) {
                console.warn(`⚠️ Found ${duplicateComptia} duplicate CompTIA question(s) (removed)`);
            }
            if (duplicateAws > 0) {
                console.warn(`⚠️ Found ${duplicateAws} duplicate AWS question(s) (removed)`);
            }

            console.log(`✅ After deduplication - CompTIA: ${uniqueComptia.length}, AWS: ${uniqueAws.length}`);

            // Update certifications with loaded questions (replace, don't append)
            const updatedCertifications = [
                updateCertificationWithQuestions('comptia', uniqueComptia),
                updateCertificationWithQuestions('aws', uniqueAws)
            ];

            setLoadedCertifications(updatedCertifications);
            console.log('Questions loaded and certifications updated successfully');
            console.log(`📊 Final counts - CompTIA: ${updatedCertifications[0].totalQuestions}, AWS: ${updatedCertifications[1].totalQuestions}`);
        } catch (err) {
            console.error('Error loading questions:', err);
            setError(`Failed to load questions. ${err instanceof Error ? err.message : 'Please check the API connection and try again.'}`);
        } finally {
            isLoadingRef.current = false;
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
            sessionStorage.removeItem(CACHE_KEY); // Clear previous cache
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
            questions = shuffleArray(questions);

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
        // If question was already answered, reset state to allow re-answering
        if (isAnswered !== null) {
            // Reset all answer-related state
            setIsAnswered(null);
            setShowExplanation(false);
            setUserAnswers(prev => (prev || []).filter(ans => ans.questionId !== currentQuestion.question_id));
            // Start fresh with just the newly clicked option
            setSelectedAnswers([optionText]);
            return;
        }

        // Normal selection/deselection for unanswered questions
        if (isMultipleAnswers(currentQuestion.multiple_answers)) {
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

    // Add cache clearing when switching certifications
    useEffect(() => {
        if (currentCertification) {
            // Clear quiz-specific state when switching certifications
            setCurrentQuestionIndex(0);
            setUserAnswers(null);
            setSelectedAnswers([]);
            setIsAnswered(null);
            setShowExplanation(false);
        }
    }, [currentCertification]);

    // Reset quiz
    const resetQuiz = () => {
        sessionStorage.removeItem(CACHE_KEY);
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



    if (isLoading && !currentCertification) { // Show loading only if no cached cert
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-burtons">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading questions from API...</p>
                </div>
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
            </div>
        );
    }

    if (!currentCertification && activeSection !== 'admin') {
        return (
            <div className="dark:bg-dark-900 dark:text-white bg-gray-50 min-h-screen font-burtons">
                <Header title="Cloud Prepper">
                    {/* Admin controls moved to main navigation */}
                </Header>
                <CertificationSelection
                    certifications={loadedCertifications}
                    onSelectCertification={(certId) => {
                        setCurrentCertification(certId);
                        setActiveSection('practice');
                    }}
                />
            </div>
        );
    }

    // Handle admin panel access without certification
    if (activeSection === 'admin' && isAdmin) {
        return <AdminDashboard onNavigateHome={() => {
            // Navigate back to the quiz section
            if (currentCertification) {
                setActiveSection('practice');  // Go to practice setup if certification selected
            } else {
                setActiveSection('quiz');  // Otherwise go to certification selection
            }
        }} />;
    }

    const getOptionClassName: (option: QuestionOptionData) => string = (option: QuestionOptionData) => {
        const baseClasses = "bg-pastel-lightGreen w-full text-left p-2.5 rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md ";
        const isExamSimulation = currentQuizConfig?.examSimulationMode ?? false;

        // In exam simulation mode, never show correct/incorrect borders - only show selection
        if (isExamSimulation) {
            if (selectedAnswers.includes(option.text)) {
                return `${baseClasses} pastel:border-pastel-cyan pastel:bg-pastel-bluelight classic:border-blue-500 classic:bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 pastel:ring-1 pastel:ring-pastel-border classic:ring-2 classic:ring-blue-200 dark:ring-blue-800 border-blue-500 bg-blue-50 ring-2 ring-blue-200`;
            }
            return `${baseClasses} pastel:border-pastel-border pastel:bg-white classic:border-blue-400 classic:hover:border-blue-300 classic:hover:bg-blue-25 dark:border-gray-600 dark:bg-dark-900 dark:hover:bg-dark-700 pastel:hover:border-pastel-mint pastel:hover:bg-pastel-mintlight/50 border-blue-400 hover:border-blue-300`;
        }

        // Normal mode - show feedback
        if (isAnswered !== null) {
            const isSelected = selectedAnswers.includes(option.text);
            if (option.isCorrect) {
                return `${baseClasses} pastel:border-green-400 pastel:bg-green-50 classic:border-green-500 classic:bg-green-50 dark:bg-green-900/30 dark:border-green-600 border-green-500 bg-green-50`;
            }
            if (isSelected && !option.isCorrect) {
                return `${baseClasses} pastel:border-red-300 pastel:bg-red-50 classic:border-red-500 classic:bg-red-50 dark:bg-red-900/30 dark:border-red-600 border-red-500 bg-red-50`;
            }
            return `${baseClasses} pastel:border-pastel-border pastel:bg-pastel-mintlight classic:border-gray-300 classic:bg-white dark:border-gray-600 dark:bg-dark-900 border-gray-300 bg-white opacity-75`;
        }

        if (selectedAnswers.includes(option.text)) {
            return `${baseClasses} pastel:border-pastel-cyan pastel:bg-pastel-bluelight classic:border-blue-500 classic:bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500 pastel:ring-1 pastel:ring-pastel-border classic:ring-2 classic:ring-blue-200 dark:ring-blue-800 border-blue-500 bg-blue-50 ring-2 ring-blue-200`;
        }

        return `${baseClasses} pastel:border-pastel-border pastel:bg-white classic:border-blue-400 classic:hover:border-blue-300 classic:hover:bg-blue-25 dark:border-gray-600 dark:bg-dark-900 dark:hover:bg-dark-700 pastel:hover:border-pastel-mint pastel:hover:bg-pastel-mintlight/50 border-blue-400 hover:border-blue-300`;
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
                            {/* Enhanced Header Card */}
                            <div
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-800 dark:to-dark-700 rounded-xl shadow-lg border border-blue-100 dark:border-dark-600 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Question {currentQuestionIndex + 1}
                                        </h2>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            {totalQuestions} questions total
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {!currentQuizConfig?.examSimulationMode && (
                                            <AnswerModeToggle answerMode={answerMode} setAnswerMode={setAnswerMode}/>
                                        )}
                                        {currentQuizConfig?.examSimulationMode && (
                                            <div className="px-4 py-2 rounded-md text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-700">
                                                🎯 Exam Simulation Mode - No Feedback
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Enhanced Progress Bar */}
                                <div className="space-y-2">
                                    <div
                                        className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <span>Progress</span>
                                        <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
                                            style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Main content area with connector */}
                            <div className="relative">
                                <div className="flex flex-col lg:flex-row gap-3 items-start relative">
                                    
                                    {/* LEFT SIDE: Explanation Card (when visible) */}
                                    {!currentQuizConfig?.examSimulationMode && showExplanation && isAnswered !== null && (
                                        <div 
                                            ref={explanationRef} 
                                            className="w-full lg:w-[35%] flex-shrink-0 animate-fade-in"
                                        >
                                            <div className="sticky top-20 max-h-[calc(100vh-140px)] overflow-y-auto">
                                                <ExplanationCard question={currentQuestion}/>
                                            </div>
                                        </div>
                                    )}

                                    {/* RIGHT SIDE: Question Card */}
                                    <div className={`w-full flex-grow transition-all duration-300 ${
                                        showExplanation && isAnswered !== null ? 'lg:w-[65%]' : 'lg:w-full'
                                    } relative`}>
                                        {/* Enhanced connector indicator */}
                                        {showExplanation && isAnswered !== null && (
                                        <div className="hidden lg:flex absolute -left-8 top-[4.5rem] w-6 items-center z-10">
                                        <div className="w-full flex items-center">
                                        <div className="h-0.5 w-full bg-gradient-to-r from-green-400 via-green-400 to-green-500 dark:from-green-500 dark:via-green-500 dark:to-green-600 shadow-sm"></div>
                                        <svg className="w-3 h-3 -ml-0.5 text-green-500 dark:text-green-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L10 4.414l6.293 6.293a1 1 0 001.414-1.414l-7-7z" transform="rotate(90 10 10)"/>
                                        </svg>
                                        </div>
                                        </div>
                                        )}
                                        
                                        {/* Enhanced Question Card */}
                                        <div
                                            className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="p-4">
                                    {/* Question Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
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
                                    <div className="mb-3">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed mb-3">
                                            {currentQuestion.question_text}
                                        </h3>
                                        {isMultipleAnswers(currentQuestion.multiple_answers) && (
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

                                    <div>

                                        {/* Answer Options */}
                                        <div className="space-y-2">
                                            {currentQuestion.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleOptionSelection(option.text)}
                                                    className={getOptionClassName(option)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <div
                                                                className={`font-NewTimesRoman size-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                                    selectedAnswers.includes(option.text)
                                                                        ? 'border-blue-600  bg-blue-500'
                                                                        : ' border-amber-900 dark:border-blue-100  dark:border-gray-600'
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
                                                            <p className="text-base text-gray-900 dark:text-white font-medium cursor-pointer">
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
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Navigation */}
                            <div
                                className="flex justify-between items-center bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={previousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="inline-flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    Previous
                                </button>

                                <div className="text-center flex flex-col items-center space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {currentQuizConfig?.examSimulationMode ? (
                                            selectedAnswers.length > 0
                                                ? `${selectedAnswers.length} answer${selectedAnswers.length > 1 ? 's' : ''} selected`
                                                : 'Select your answer'
                                        ) : (
                                            selectedAnswers.length > 0 && isAnswered === null
                                                ? `${selectedAnswers.length} answer${selectedAnswers.length > 1 ? 's' : ''} selected`
                                                : isAnswered !== null
                                                    ? (isAnswered ? '✓ Correct' : '✗ Incorrect')
                                                    : 'Select your answer'
                                        )}
                                    </p>
                                    <button
                                        onClick={handleSubmitQuiz}
                                        className="inline-flex items-center px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors text-xs font-medium shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        Submit Quiz
                                    </button>
                                </div>

                                {(() => {
                                    const isExamSim = currentQuizConfig?.examSimulationMode ?? false;
                                    const hasAnswers = selectedAnswers.length > 0;
                                    const questionAnswered = userAnswers?.some(a => a.questionId === currentQuestion.question_id) ?? false;
                                    
                                    // In exam simulation: show "Next Question" if answers selected (auto-submits)
                                    // In normal mode: show "Submit Answer" first
                                    const shouldShowNextButton = isExamSim && hasAnswers && !questionAnswered;
                                    
                                    if (shouldShowNextButton || isAnswered !== null) {
                                        return (
                                            <button
                                                onClick={nextQuestion}
                                                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
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
                                        );
                                    }
                                    
                                    return null;
                                })()}
                                {(() => {
                                    const isExamSim = currentQuizConfig?.examSimulationMode ?? false;
                                    const hasAnswers = selectedAnswers.length > 0;
                                    const questionAnswered = userAnswers?.some(a => a.questionId === currentQuestion.question_id) ?? false;
                                    
                                    // Show submit button only if not in exam sim with answers (exam sim shows Next instead)
                                    const shouldShowSubmit = !isExamSim || !hasAnswers || questionAnswered;
                                    
                                    if (shouldShowSubmit && isAnswered === null) {
                                        return (
                                            <button
                                        onClick={handleAnswerSubmission}
                                        disabled={selectedAnswers.length === 0}
                                        className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm rounded-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12l2 2 4-4"/>
                                        </svg>
                                        Submit Answer
                                            </button>
                                        );
                                    }
                                    
                                    return null;
                                })()}
                            </div>
                        </div>
                    )}

                    {activeSection === 'results' && (
                        <QuizResults
                            userAnswers={userAnswers}
                            questions={currentQuizQuestions}
                            onRestart={handleRestartQuiz}
                            onBackToSelection={resetQuiz}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default CloudPrepApp;
