// src/App.tsx - Updated to use domain-based question system
import React, {useEffect, useState} from 'react';
import {AnswerMode, AnswerRecord, Question, QuizMode, SectionType, SelectedAnswer} from "./types/preptypes";
import {CERTIFICATIONS} from "./config/domainConfig";
import {DomainQuestionSelection} from "./components/DomainQuestionSelection";
import ExplanationCard from "./components/ExplanationCard";
import {AnswerModeToggle} from "./components/AnswerModeToggle";
import {BsFillMoonStarsFill} from "react-icons/bs";

const CloudPrepApp: React.FC = () => {
    // Certification management
    const [currentCertification, setCurrentCertification] = useState<'comptia' | 'aws'>('comptia');

    // Main application state
    const [activeSection, setActiveSection] = useState<SectionType>('question-selection');
    const [quizMode, setQuizMode] = useState<QuizMode>('quiz');

    // Quiz state
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
    const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
    const [quizStartTime, setQuizStartTime] = useState<Date>(new Date(Date.now()));
    const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
    const [isAnswered, setIsAnswered] = useState<boolean | null>(null);
    const [answerMode, setAnswerMode] = React.useState<AnswerMode | number>(AnswerMode.inline);
    const [showExplanation, setShowExplanation] = React.useState<boolean>(false);
    const [doneStudying, setDoneStudying] = React.useState<boolean>(false);

    // Current quiz questions and index
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuizConfig, setCurrentQuizConfig] = useState<any>(null);

    // Get current question safely
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    const totalQuestions = currentQuizQuestions.length;

    const [darkMode, setDarkMode] = useState(false);

    // Load dark mode preference from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Use system preference as fallback
            setDarkMode(true);
        }
    }, []);

    // Save dark mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        // Apply or remove dark class from html element for better dark mode
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Get current certification data
    const getCurrentCertification = () => {
        const cert = CERTIFICATIONS.find(cert => cert.id === currentCertification)!;
        console.log("current certification: ", cert);
        return cert;
    }

    // Handle starting a new quiz from domain selection
    const handleStartQuiz = (questions: Question[], config: any) => {
        setCurrentQuizQuestions(questions);
        setCurrentQuizConfig(config);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setUserAnswers([]);
        setIsAnswered(false);
        setShowExplanation(false);
        setDoneStudying(false);
        setQuizStartTime(new Date(Date.now()));
        setQuestionStartTime(new Date(Date.now()));
        setActiveSection('practice');
    };

    // Handle certification change
    const handleCertificationChange = (newCert: 'comptia' | 'aws') => {
        console.log("Setting certification to:", newCert);
        setCurrentCertification(newCert);
        setCurrentQuizQuestions([]);
        setUserAnswers([]);
        setCurrentQuestionIndex(0);
        setCurrentQuizConfig(null);
        setActiveSection('question-selection');
    };

    // Your existing quiz logic (keep all of this)
    const nextQuestion = (): void => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setQuestionStartTime(new Date());
        } else {
            setActiveSection('results');
        }
    };

    const previousQuestion = (): void => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            const previousAnswer = userAnswers.find(answer => answer.questionIndex === currentQuestionIndex - 1);

            if (previousAnswer) {
                setIsAnswered(true);
                setSelectedAnswer({
                    index: previousAnswer.selectedOptionIndex,
                    isCorrect: previousAnswer.isCorrect
                });
                setShowExplanation(answerMode === AnswerMode.inline);
            } else {
                setIsAnswered(false);
                setSelectedAnswer(null);
                setShowExplanation(false);
            }
            setQuestionStartTime(new Date());
        }
    };

    const selectOption = (optionIndex: number, isCorrect: boolean): void => {
        setSelectedAnswer({index: optionIndex, isCorrect});
    };

    const submitAnswer = (): void => {
        if (!selectedAnswer) return;

        const timeTaken = new Date().getTime() - questionStartTime.getTime();
        const newAnswer: AnswerRecord = {
            questionIndex: currentQuestionIndex,
            selectedOptionIndex: selectedAnswer.index,
            isCorrect: selectedAnswer.isCorrect,
            timeTaken: timeTaken
        };

        setUserAnswers(prev => {
            const existingIndex = prev.findIndex(ans => ans.questionIndex === currentQuestionIndex);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newAnswer;
                return updated;
            }
            return [...prev, newAnswer];
        });

        setIsAnswered(true);

        if (answerMode === AnswerMode.inline) {
            setShowExplanation(true);
            setDoneStudying(false);
        } else {
            setShowExplanation(false);
            setDoneStudying(true);
        }

        if (doneStudying && showExplanation) {
            setTimeout(() => nextQuestion(), 300);
        } else if (doneStudying && !showExplanation) {
            setTimeout(() => nextQuestion(), 300);
        }
    };

    const QuestionOption: React.FC<{
        children: React.ReactNode;
        isSelected: boolean;
        isCorrect?: boolean;
        isIncorrect?: boolean;
        onClick: () => void;
    }> = ({children, isSelected, isCorrect = false, isIncorrect = false, onClick}) => (
        <div
            onClick={onClick}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                isCorrect
                    ? 'bg-green-500 text-white border-green-600'
                    : isIncorrect
                        ? 'bg-red-500 text-white border-red-600'
                        : isSelected
                            ? 'bg-blue-500 text-white border-blue-600'
                            : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300 dark:bg-gray-700/60 dark:border-gray-600 dark:hover:bg-gray-600'
            }`}
        >
            {children}
        </div>
    );

    return (
        <div className={'font-bold text-xl min-h-screen'}>
            <nav
                className="font-bold backdrop-blur-sm border-b border-black/10 dark:border-white/10 sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <div>
                                <BsFillMoonStarsFill className={'cursor-pointer 2xl'}
                                                     onClick={() => setDarkMode(!darkMode)}/>
                            </div>
                            <div className="font-bold text-xl">
                                {getCurrentCertification().icon} {getCurrentCertification().name}
                            </div>
                            <div className="hidden md:flex space-x-6">
                                <button
                                    onClick={() => setActiveSection('question-selection')}
                                    className={`nav-link ${
                                        activeSection === 'question-selection' ? 'nav-link-active' : ''
                                    }`}
                                >
                                    📚 Study
                                </button>
                                <button
                                    onClick={() => setActiveSection('practice')}
                                    disabled={currentQuizQuestions.length === 0}
                                    className={`nav-link disabled:opacity-50 ${
                                        activeSection === 'practice' ? 'nav-link-active' : ''
                                    }`}
                                >
                                    ✏️ Practice
                                </button>
                                <button
                                    onClick={() => setActiveSection('results')}
                                    disabled={userAnswers.length === 0}
                                    className={`nav-link disabled:opacity-50 ${
                                        activeSection === 'results' ? 'nav-link-active' : ''
                                    }`}
                                >
                                    📊 Results
                                </button>
                            </div>
                        </div>

                        {/* Certification Switcher */}
                        <select
                            value={currentCertification}
                            onChange={(e) => handleCertificationChange(e.target.value as 'comptia' | 'aws')}
                            className="form-select"
                        >
                            <option value="comptia">☁️ CompTIA Cloud+</option>
                            <option value="aws">🏗️ AWS Solutions Architect</option>
                        </select>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-5">
                {/* Answer Mode Toggle for practice sessions */}
                {(activeSection === 'practice' || activeSection === 'review') && (
                    <AnswerModeToggle
                        answerMode={answerMode}
                        setAnswerMode={(mode) => setAnswerMode(mode)}
                    />
                )}

                {/* Domain-Based Question Selection */}
                {activeSection === 'question-selection' && (
                    <DomainQuestionSelection
                        certification={getCurrentCertification()}
                        userAnswers={userAnswers}
                        onStartQuiz={handleStartQuiz}
                        onCertificationChange={handleCertificationChange}
                    />
                )}

                {/* Practice Mode */}
                {activeSection === 'practice' && quizMode === 'quiz' && currentQuestion && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Progress Sidebar */}
                        <div className="card bg-gray-100/80 dark:bg-gray-800/80">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="text-sm font-medium">
                                        {currentQuestionIndex + 1} of {totalQuestions}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}
                                    />
                                </div>
                            </div>

                            {/* Quiz Config Info */}
                            {currentQuizConfig && (
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-800/50">
                                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Quiz Details</h3>
                                    <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                                        <div>Type: {currentQuizConfig.testType}</div>
                                        <div>Questions: {totalQuestions}</div>
                                        <div>Certification: {getCurrentCertification().code}</div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setActiveSection('question-selection')}
                                    className="btn btn-purple"
                                >
                                    📝 New Quiz
                                </button>

                                {/* Current Question Info */}
                                <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        <div><strong>Domain:</strong> {currentQuestion.domain}</div>
                                        <div><strong>Difficulty:</strong> {currentQuestion.difficulty}</div>
                                        <div><strong>Category:</strong> {currentQuestion.category}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="lg:col-span-3">
                            <div
                                className="card p-8">
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Question {currentQuestionIndex + 1} of {totalQuestions}
                                        </span>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {currentQuestion.difficulty}
                                            </span>
                                            <span
                                                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                {currentQuestion.domain}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold mb-4">
                                        {currentQuestion.questionText}
                                    </h2>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {currentQuestion.options.map((option, index) => (
                                        <QuestionOption
                                            key={index}
                                            isSelected={selectedAnswer?.index === index}
                                            isCorrect={isAnswered && option.isCorrect}
                                            isIncorrect={isAnswered && selectedAnswer?.index === index && !option.isCorrect}
                                            onClick={() => !isAnswered && selectOption(index, option.isCorrect)}
                                        >
                                            {option.text}
                                        </QuestionOption>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={previousQuestion}
                                        disabled={currentQuestionIndex === 0}
                                        className="btn btn-secondary"
                                    >
                                        Previous
                                    </button>

                                    {!isAnswered ? (
                                        <button
                                            onClick={submitAnswer}
                                            disabled={!selectedAnswer}
                                            className="btn btn-primary"
                                        >
                                            Submit Answer
                                        </button>
                                    ) : (
                                        <button
                                            onClick={nextQuestion}
                                            className="btn btn-success"
                                        >
                                            {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                                        </button>
                                    )}
                                </div>

                                {showExplanation && answerMode === AnswerMode.inline && (
                                    <ExplanationCard question={currentQuestion} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {activeSection === 'results' && (
                    <div className="card p-8">
                        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="stat-card">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{userAnswers.length}</div>
                                <div className="text-blue-800 dark:text-blue-300">Questions Answered</div>
                            </div>
                            <div className="stat-card bg-green-50 dark:bg-gray-800">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                    {userAnswers.length > 0 ? Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100) : 0}%
                                </div>
                                <div className="text-green-800 dark:text-green-300">Accuracy</div>
                            </div>
                            <div className="stat-card bg-purple-50 dark:bg-gray-800">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                    {Math.round(userAnswers.reduce((sum, ans) => sum + ans.timeTaken, 0) / 60000)}
                                </div>
                                <div className="text-purple-800 dark:text-purple-300">Minutes Spent</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setActiveSection('question-selection')}
                                className="btn btn-primary"
                            >
                                📚 Take Another Quiz
                            </button>
                            <button
                                onClick={() => setActiveSection('practice')}
                                disabled={currentQuizQuestions.length === 0}
                                className="btn btn-success disabled:opacity-50"
                            >
                                🔄 Review Questions
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
};

export default CloudPrepApp;

// INTEGRATION NOTES:
// 1. Replace your current domains array with the COMPTIA_DOMAINS from domainConfig.ts
// 2. Update your questions to have proper domain matching (or use the organizeQuestionsByDomain function)
// 3. Replace the old utils.ts functions with the new domainUtils functions
// 4. The DomainQuestionSelection component replaces your current quiz config
// 5. All existing quiz logic (submitAnswer, nextQuestion, etc.) works unchanged!