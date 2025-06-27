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
    SectionType
} from './types/preptypes';

const CloudPrepApp: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const domains: Domain[] = [
        {name: 'Cloud Architecture', progress: 85},
        {name: 'Deployments', progress: 72},
        {name: 'Operations', progress: 68},
        {name: 'Security', progress: 91},
        {name: 'DevOps', progress: 78},
        {name: 'Troubleshooting', progress: 63}
    ];

    const selectOption = (optionIndex: number, isCorrect: boolean): void => {
        if (isAnswered) return;
        setSelectedAnswer({index: optionIndex, isCorrect});
    };

    const submitAnswer = (): void => {
        if (!selectedAnswer || isAnswered) return;
        setIsAnswered(true);
        setShowExplanation(true);
    };

    const nextQuestion = (): void => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
            <div className="max-w-7xl mx-auto p-5">
                {/* Navigation */}
                <nav className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-blue-600">CloudPrep</div>
                        <div className="flex gap-5">
                            <NavTab
                                label="Dashboard"
                                isActive={activeSection === 'dashboard'}
                                onClick={() => setActiveSection('dashboard')} section={''}                            />
                            <NavTab
                                label="Practice"
                                isActive={activeSection === 'practice'}
                                onClick={() => setActiveSection('practice')} section={''}                            />
                            <NavTab
                                label="Analytics"
                                isActive={activeSection === 'analytics'}
                                onClick={() => setActiveSection('analytics')} section={''}                            />
                            <NavTab
                                label="Study Plan"
                                isActive={activeSection === 'study-plan'}
                                onClick={() => setActiveSection('study-plan')} section={''}                            />
                        </div>
                    </div>
                </nav>

                {/* Dashboard Section */}
                {activeSection === 'dashboard' && (
                    <div>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Questions Completed" value="847"/>
                            <StatCard title="Overall Accuracy" value="73%"/>
                            <StatCard title="Study Streak" value="28" subtitle="days"/>
                            <StatCard title="Exam Readiness" value="86%"/>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Left Sidebar - Domain Progress */}
                            <div
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                                <h3 className="text-xl font-bold text-blue-600 mb-6">Domain Progress</h3>
                                <div className="space-y-1">
                                    {domains.map((domain: Domain, index: number) => (
                                        <DomainProgress key={index} name={domain.name} progress={domain.progress}/>
                                    ))}
                                </div>
                            </div>

                            {/* Center Panel */}
                            <div
                                className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                                <h2 className="text-2xl font-bold text-blue-600 mb-6">Recommended Next Steps</h2>

                                {/* Focus Areas */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-yellow-800 mb-3">Focus Areas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Network Troubleshooting</span>
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Container Orchestration</span>
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Cost Optimization</span>
                                    </div>
                                </div>

                                {/* Today's Goal */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-blue-800 mb-2">Today's Goal</h4>
                                    <p className="text-gray-700 mb-3">Complete 25 questions focusing on Cloud Operations
                                        and Troubleshooting domains.</p>
                                    <div className="bg-blue-100 h-2 rounded-full mb-2">
                                        <div className="bg-blue-500 h-full w-3/5 rounded-full"></div>
                                    </div>
                                    <span className="text-sm text-gray-600">15/25 questions completed</span>
                                </div>

                                <button
                                    onClick={() => setActiveSection('practice')}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Continue Practice Session
                                </button>
                            </div>

                            {/* Right Sidebar */}
                            <div
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                                <div className="text-center mb-6">
                                    <ProgressCircle percentage={86}/>
                                    <h4 className="text-lg font-semibold">Exam Ready</h4>
                                    <p className="text-gray-500 text-sm">Based on your performance across all
                                        domains</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-blue-600 mb-4">Today's Plan</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓
                                            </div>
                                            <span className="text-gray-700">Morning Review - 15 min</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓
                                            </div>
                                            <span className="text-gray-700">Operations Practice - 30 min</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">○
                                            </div>
                                            <span className="text-gray-700">Troubleshooting Scenarios - 20 min</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">○
                                            </div>
                                            <span className="text-gray-700">Review Mistakes - 10 min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Practice Section */}
                {activeSection === 'practice' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Left Sidebar - Progress */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <h3 className="text-xl font-bold text-blue-600 mb-4">Question Progress</h3>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Question 15 of 25</span>
                                    <span>60%</span>
                                </div>
                                <div className="bg-blue-100 h-2 rounded-full">
                                    <div className="bg-blue-500 h-full w-3/5 rounded-full"></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h4 className="font-semibold mb-3">Session Stats</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Correct:</span>
                                        <span className="text-green-600 font-semibold">11</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Incorrect:</span>
                                        <span className="text-red-600 font-semibold">3</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Accuracy:</span>
                                        <span className="text-blue-600 font-semibold">78%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                                    Pause Session
                                </button>
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                                    End Session
                                </button>
                            </div>
                        </div>

                        {/* Center Panel - Question */}
                        <div
                            className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Cloud Operations - Scaling</h3>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                    Domain 3 • Difficulty: Application • 2 min
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg leading-relaxed mb-6">
                                    Your organization runs a web application that experiences predictable traffic spikes
                                    every weekday from 9 AM to 5 PM, with traffic increasing by 300% during these hours.
                                    The application currently uses a single large EC2 instance that struggles during
                                    peak hours but is oversized during off-hours. Which scaling approach would be most
                                    cost-effective while maintaining performance?
                                </p>

                                <div className="space-y-3">
                                    <QuestionOption
                                        index={0}
                                        isSelected={selectedAnswer?.index === 0}
                                        isIncorrect={isAnswered && selectedAnswer?.index === 0 && !selectedAnswer?.isCorrect}
                                        onClick={() => selectOption(0, false)}
                                    >
                                        A) Implement vertical scaling by upgrading to a larger instance size during
                                        business hours
                                    </QuestionOption>

                                    <QuestionOption
                                        index={1}
                                        isSelected={selectedAnswer?.index === 1}
                                        isCorrect={isAnswered && selectedAnswer?.index === 1}
                                        onClick={() => selectOption(1, true)}
                                    >
                                        B) Configure horizontal auto-scaling with smaller instances that scale based on
                                        CPU utilization
                                    </QuestionOption>

                                    <QuestionOption
                                        index={2}
                                        isSelected={selectedAnswer?.index === 2}
                                        isIncorrect={isAnswered && selectedAnswer?.index === 2 && !selectedAnswer?.isCorrect}
                                        onClick={() => selectOption(2, false)}
                                    >
                                        C) Use reserved instances to handle peak capacity at all times
                                    </QuestionOption>

                                    <QuestionOption
                                        index={3}
                                        isSelected={selectedAnswer?.index === 3}
                                        isIncorrect={isAnswered && selectedAnswer?.index === 3 && !selectedAnswer?.isCorrect}
                                        onClick={() => selectOption(3, false)}
                                    >
                                        D) Deploy multiple large instances and use a load balancer to distribute traffic
                                    </QuestionOption>
                                </div>
                            </div>

                            {showExplanation && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                                    <p className="mb-2"><strong>Correct Answer: B</strong></p>
                                    <p className="text-gray-700 mb-3">
                                        Horizontal auto-scaling with smaller instances is the most cost-effective
                                        solution for predictable traffic patterns. This approach allows you to:
                                    </p>
                                    <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
                                        <li>Scale out during peak hours to handle increased load</li>
                                        <li>Scale in during off-hours to minimize costs</li>
                                        <li>Use smaller, more cost-efficient instance types</li>
                                        <li>Improve fault tolerance through distribution</li>
                                    </ul>
                                    <p className="text-gray-700 text-sm">
                                        <strong>Why other options are less optimal:</strong><br/>
                                        A) Vertical scaling requires downtime and doesn't optimize for off-peak
                                        costs<br/>
                                        C) Reserved instances for peak capacity waste money during off-hours<br/>
                                        D) Multiple large instances running continuously are unnecessarily expensive
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-center gap-4">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg transition-colors">
                                    Previous
                                </button>
                                {!isAnswered ? (
                                    <button
                                        onClick={submitAnswer}
                                        disabled={!selectedAnswer}
                                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        Next Question
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar - Actions */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <h4 className="font-semibold text-blue-600 mb-4">Quick Actions</h4>
                            <div className="space-y-3 mb-6">
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                                    Mark for Review
                                </button>
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                                    Show Hint
                                </button>
                                <button
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                                    Report Issue
                                </button>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h5 className="text-yellow-800 font-semibold mb-2">💡 Study Tip</h5>
                                <p className="text-yellow-700 text-sm">
                                    When evaluating scaling solutions, always consider both cost and performance
                                    implications. Auto-scaling groups provide the best balance for variable workloads.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Analytics Section */}
                {activeSection === 'analytics' && (
                    <div className="bg-white/95 backdrop
-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Analytics Coming Soon</h2>
                        <p className="text-gray-600">Detailed performance analytics and insights will be available
                            here.</p>
                    </div>
                )}

                {/* Study Plan Section */}
                {activeSection === 'study-plan' && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6">Study Plan Coming Soon</h2>
                        <p className="text-gray-600">Personalized study plans and scheduling will be available here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CloudPrepApp;