import React, {useState, useEffect} from 'react';
import {AnswerMode, AnswerRecord, Domain, Question, QuizMode, SectionType, SelectedAnswer} from "@/types/preptypes";
import {QUESTIONS} from "./QuestionRepository/Questions";
import {QuizResults} from "./components/QuizResults";
import Nav from "./components/Nav";
import {Dashboard} from "./components/Dashboard";

const CloudPrepApp: React.FC = () => {
    // Main application state
    const [activeSection, setActiveSection] = useState<SectionType>('practice');
    const [quizMode, setQuizMode] = useState<QuizMode>('quiz');
    const [answerMode, setAnswerMode] = useState<AnswerMode | null>('inline');

    // Quiz state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
    const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
    const [quizStartTime, setQuizStartTime] = useState<Date>(new Date());
    const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
    const [isAnswered, setIsAnswered] = useState<boolean | null>(null);
    const [showExplanation, setShowExplanation] = useState<boolean | null>(null);


    // Quiz configuration
    const [questions] = useState<Question[]>(QUESTIONS);
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        console.log("currentQuestion", currentQuestion);
    }, [activeSection])

    const domains: Domain[] = [
        {name: 'Cloud Architecture', progress: 0},
        {name: 'Deployments', progress: 0},
        {name: 'Operations', progress: 0},
        {name: 'Security', progress: 0},
        {name: 'DevOps', progress: 0},
        {name: 'Troubleshooting', progress: 0}
    ];

    // Quiz functions
    const selectOption = (optionIndex: number, isCorrect: boolean): void => {
        setSelectedAnswer({index: optionIndex, isCorrect});
    };

    const submitAnswer = (): void => {
        if (!selectedAnswer || isAnswered) return;

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

        // Show explanation immediately in inline mode
        if (answerMode === 'inline') {
            setShowExplanation(true);
        }

        // In quiz mode, automatically advance to next question after a brief delay
        if (answerMode === 'end-only') {
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        }
    };

    // Modified nextQuestion function
    const nextQuestion = (): void => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setQuestionStartTime(new Date());
        } else {
            // Quiz finished - show results
            setActiveSection('results');
        }
    };
    const previousQuestion = (): void => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setShowExplanation(false);
            setQuestionStartTime(new Date());

            // Restore previous answer if exists
            const previousAnswer = userAnswers.find(ans => ans.questionIndex === currentQuestionIndex - 1);
            if (previousAnswer) {
                setSelectedAnswer({
                    index: previousAnswer.selectedOptionIndex,
                    isCorrect: previousAnswer.isCorrect
                });
                setIsAnswered(true);
                if (answerMode === 'inline') {
                    setShowExplanation(true);
                }
            }
        }
    };

    // Components
    const AnswerModeToggle = () => (
        <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">Answer Mode:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => setAnswerMode('inline')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        answerMode === 'inline'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                    📝 Study Mode
                </button>
                <button
                    onClick={() => setAnswerMode('end-only')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        answerMode === 'end-only'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                    🎯 Quiz Mode
                </button>
            </div>
            <div className="text-xs text-gray-500 ml-2">
                {answerMode === 'inline' ? 'See explanations immediately' : 'Review all answers at the end'}
            </div>
        </div>
    );
    const ExplanationCard: React.FC<{ question: Question }> = ({question}) => (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                💡 Explanation
            </h4>
            <p className="text-gray-700 mb-4">{question.explanation}</p>

            {question.explanationDetails && (
                <>
                    <div className="mb-4">
                        <h5 className="font-medium text-blue-700 mb-2">{question.explanationDetails.summary}</h5>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {question.explanationDetails.breakdown.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <strong>Why other options are incorrect:</strong>
                        <div className="mt-1 whitespace-pre-line">{question.explanationDetails.otherOptions}</div>
                    </div>
                </>
            )}
        </div>
    );

    const startReview = (): void => {
        setActiveSection('review');
        setQuizMode('review');
    };

    const restartQuiz = (): void => {
        setActiveSection('practice');
        setQuizMode('quiz');
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setUserAnswers([]);
        setQuizStartTime(new Date());
        setQuestionStartTime(new Date());
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
                            : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
            }`}
        >
            {children}
        </div>
    );


    const ReviewMode: React.FC = () => {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Answer Review</h2>
                        <button
                            onClick={restartQuiz}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Take New Quiz
                        </button>
                    </div>

                    <div className="space-y-8">
                        {questions.map((question, index) => {
                            const userAnswer = userAnswers.find(a => a.questionIndex === index);
                            const correctOption = question.options.find(opt => opt.isCorrect);
                            const userSelectedOption = userAnswer ? question.options[userAnswer.selectedOptionIndex] : null;
                            const isCorrect = userAnswer?.isCorrect || false;

                            return (
                                <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-lg">Question {index + 1}</span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    isCorrect
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-3">
                                                {question.category} • {question.difficulty}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-800 mb-4 font-medium">{question.questionText}</p>

                                    <div className="space-y-2 mb-4">
                                        {question.options.map((option, optionIndex) => {
                                            const isUserChoice = userAnswer?.selectedOptionIndex === optionIndex;
                                            const isCorrectOption = option.isCorrect;

                                            return (
                                                <div
                                                    key={optionIndex}
                                                    className={`p-3 rounded-lg border-2 ${
                                                        isCorrectOption
                                                            ? 'bg-green-100 border-green-500 text-green-800'
                                                            : isUserChoice && !isCorrectOption
                                                                ? 'bg-red-100 border-red-500 text-red-800'
                                                                : 'bg-gray-50 border-gray-200'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {option.text}
                                                        {isCorrectOption && (
                                                            <span
                                                                className="text-green-600 font-medium">✓ Correct</span>
                                                        )}
                                                        {isUserChoice && !isCorrectOption && (
                                                            <span
                                                                className="text-red-600 font-medium">✗ Your Answer</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {answerMode === 'inline' && showExplanation && isAnswered && (
                                        <ExplanationCard question={currentQuestion}/>
                                    )}
                                    {question.explanationDetails && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                                            <p className="text-gray-700 mb-3">{question.explanationDetails.summary}</p>
                                            <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
                                                {question.explanationDetails.breakdown.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                            <p className="text-gray-700 text-sm whitespace-pre-line">
                                                <strong>Why other options are less optimal:</strong><br/>
                                                {question.explanationDetails.otherOptions}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
            <Nav setActiveSection={setActiveSection} activeSection={activeSection}/>
            <div className="max-w-7xl mx-auto p-5">
                <AnswerModeToggle/>
                {activeSection === 'dashboard' && (
                    <Dashboard setActiveSection={setActiveSection} length={questions.length}/>
                )}
                {activeSection === 'practice' && quizMode === 'quiz' && currentQuestion && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Progress Sidebar */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <h3 className="text-xl font-bold text-blue-600 mb-4">Progress</h3>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                                    <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                                </div>
                                <div className="bg-blue-100 h-2 rounded-full">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                                        style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-gray-600">
                                    Answered: {userAnswers.length} / {totalQuestions}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Correct: {userAnswers.filter(a => a.isCorrect).length}
                                </div>
                            </div>
                        </div>

                        {/* Question Panel */}
                        <div
                            className="lg:col-span-3 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">{currentQuestion.category}</h3>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                    {currentQuestion.domain} • {currentQuestion.difficulty}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg leading-relaxed mb-6">{currentQuestion.questionText}</p>

                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <QuestionOption
                                            key={index}
                                            isSelected={selectedAnswer?.index === index}
                                            onClick={() => selectOption(index, option.isCorrect)}
                                        >
                                            {option.text}
                                        </QuestionOption>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={previousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 py-2 px-6 rounded-lg transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="text-sm text-gray-500">
                                    No explanations until quiz is complete
                                </div>

                                <button
                                    onClick={submitAnswer}
                                    disabled={!selectedAnswer}
                                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-lg transition-colors"
                                >
                                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Show explanation in inline mode */}
                {answerMode === 'inline' && isAnswered && showExplanation && currentQuestion && (
                    <ExplanationCard question={currentQuestion}/>
                )}
                {/* Results Section */}
                {activeSection === 'results' && <QuizResults/>}

                {/* Review Section */}
                {activeSection === 'review' && <ReviewMode/>}

                {/* {activeSection === 'selection' && <QuizResults/>} */}
            </div>
        </div>
    )

};

export default CloudPrepApp;