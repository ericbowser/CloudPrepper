// Import using ES6 syntax
import React, {useState} from 'react';
import {
    Domain,
    SelectedAnswer,
    NavTabProps,
    ProgressCircleProps,
    StatCardProps,
    DomainProgressProps,
    QuestionOptionProps,
    SectionType,
    Question
} from './types/preptypes';
// Import using ES6 syntax
import {QUESTIONS} from "./QuestionRepository/Questions";

const CloudPrepApp: React.FC = () => {
    // 2. REFINED STATE MANAGEMENT
    const [activeSection, setActiveSection] = useState<SectionType>('practice'); // Default to practice for easy testing
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    // Derived state: The current question object is derived from the index.
    // No need for a separate `useState` for the question itself.
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const totalQuestions = QUESTIONS.length;

    const domains: Domain[] = [
        {name: 'Cloud Architecture', progress: 0},
        {name: 'Deployments', progress: 0},
        {name: 'Operations', progress: 0},
        {name: 'Security', progress: 0},
        {name: 'DevOps', progress: 0},
        {name: 'Troubleshooting', progress: 0}
    ];

    const selectOption = (optionIndex: number, isCorrect: boolean): void => {
        if (isAnswered) return;
        setSelectedAnswer({index: optionIndex, isCorrect});
    };

    const submitAnswer = (): void => {
        if (!selectedAnswer || isAnswered) return;
        setIsAnswered(true);
        setShowExplanation(true);
        // Here you could add logic to update domain progress or other stats
    };

    const nextQuestion = (): void => {
        // Move to the next question if one exists
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            // Reset state for the new question
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            // Handle quiz completion
            console.log("Quiz finished!");
            setActiveSection('dashboard'); // Or a results screen
        }
    };

    const previousQuestion = (): void => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    // --- Sub-components can be kept here or moved to their own files for better organization ---
    const NavTab: React.FC<NavTabProps> = ({label, isActive, onClick}) => (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
        >
            {label}
        </button>
    );

    const ProgressCircle: React.FC<ProgressCircleProps> = ({percentage}) => (
        <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                />
                <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
            </div>
        </div>
    );

    const StatCard: React.FC<StatCardProps> = ({title, value, subtitle}) => (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
            <div className="text-gray-600 font-medium">{title}</div>
            {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
        </div>
    );

    const DomainProgress: React.FC<DomainProgressProps> = ({name, progress}) => (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700 font-medium">{name}</span>
            <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{width: `${progress}%`}}
                    />
                </div>
                <span className="text-sm text-gray-500 w-8">{progress}%</span>
            </div>
        </div>
    );

    const QuestionOption: React.FC<QuestionOptionProps> = ({
       children,
       isSelected,
       isCorrect = false,
       isIncorrect = false,
       onClick
    }) => (
        <div
            onClick={onClick}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                isCorrect
                    ? 'bg-green-500 text-white border-green-600' // Correct and answered
                    : isIncorrect
                        ? 'bg-red-500 text-white border-red-600' // Incorrect and answered
                        : isSelected
                            ? 'bg-blue-500 text-white border-blue-600' // Selected but not yet answered
                            : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300' // Default
            }`}
        >
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
            <div className="max-w-7xl mx-auto p-5">
                {/* Navigation - 4. CLEANUP: Removed invalid 'section' prop */}
                <nav className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-blue-600">CloudPrep</div>
                        <div className="flex gap-5">
                            <NavTab label="Dashboard" isActive={activeSection === 'dashboard'}
                                    onClick={() => setActiveSection('dashboard')} section={''}/>
                            <NavTab label="Practice" isActive={activeSection === 'practice'}
                                    onClick={() => setActiveSection('practice')} section={''}/>
                            <NavTab label="Analytics" isActive={activeSection === 'analytics'}
                                    onClick={() => setActiveSection('analytics')} section={''}/>
                            <NavTab label="Study Plan" isActive={activeSection === 'study-plan'}
                                    onClick={() => setActiveSection('study-plan')} section={''}/>
                        </div>
                    </div>
                </nav>

                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <div>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Questions Completed" value={"0"}/>
                            <StatCard title="Overall Accuracy" value={"0%"}/>
                            <StatCard title="Study Streak" value="0" subtitle="days"/>
                            <StatCard title="Exam Readiness" value="0%"/>
                        </div>
                        {/* ... other dashboard content */}
                    </div>
                )}

                {/* 3. DYNAMIC Practice Section */}
                {activeSection === 'practice' && currentQuestion && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Left Sidebar - Progress */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <h3 className="text-xl font-bold text-blue-600 mb-4">Question Progress</h3>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                                    <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                                </div>
                                <div className="bg-blue-100 h-2 rounded-full">
                                    <div className="bg-blue-500 h-full rounded-full"
                                         style={{width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`}}></div>
                                </div>
                            </div>
                            {/* ... other sidebar content */}
                        </div>

                        {/* Center Panel - Question */}
                        <div
                            className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">{currentQuestion.category}</h3>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                    {currentQuestion.domain} • Difficulty: {currentQuestion.difficulty}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg leading-relaxed mb-6">
                                    {currentQuestion.questionText}
                                </p>

                                <div className="space-y-3">
                                    {/* Map over the options to render them dynamically */}
                                    {currentQuestion.options.map((option, index) => (
                                        <QuestionOption
                                            key={option.text} // A unique key is important for React's rendering
                                            isSelected={selectedAnswer?.index === index}
                                            // Show green if answered and this is the correct option
                                            isCorrect={isAnswered && option.isCorrect}
                                            // Show red if answered, this option was selected, and it's incorrect
                                            isIncorrect={isAnswered && selectedAnswer?.index === index && !selectedAnswer.isCorrect}
                                            onClick={() => selectOption(index, option.isCorrect)} 
                                            index={0}
                                        >
                                            {option.text}
                                        </QuestionOption>
                                    ))}
                                </div>
                            </div>

                            {showExplanation && currentQuestion.explanationDetails && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                                    <p className="mb-2"><strong>Correct
                                        Answer: {currentQuestion.options.find(opt => opt.isCorrect)?.text.substring(0, 2)}</strong>
                                    </p>
                                    <p className="text-gray-700 mb-3">{currentQuestion.explanationDetails.summary}</p>
                                    <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
                                        {currentQuestion.explanationDetails.breakdown.map((item, i) => <li
                                            key={i}>{item}</li>)}
                                    </ul>
                                    <p className="text-gray-700 text-sm whitespace-pre-line">
                                        <strong>Why other options are less optimal:</strong><br/>
                                        {currentQuestion.explanationDetails.otherOptions}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={previousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 py-2 px-6 rounded-lg transition-colors">
                                    Previous
                                </button>
                                {!isAnswered ? (
                                    <button
                                        onClick={submitAnswer}
                                        disabled={!selectedAnswer}
                                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* ... right sidebar content */}
                    </div>
                )}
                {/* ... other sections */}
            </div>
        </div>
    );
};

export default CloudPrepApp;