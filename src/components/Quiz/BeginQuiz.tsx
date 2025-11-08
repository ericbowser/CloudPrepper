// components/PracticeSetup.tsx - Updated for PostgreSQL integration
import React, {useEffect, useState} from 'react';
import type {CertificationData, Question} from '../../types/preptypes';
import {QuizConfig} from "../../types/preptypes";


interface PracticeSetupProps {
    certification: CertificationData | undefined;
    onStartQuiz: (config: QuizConfig) => void;
}

export const BeginQuiz: React.FC<PracticeSetupProps> = ({
                                                            certification,
                                                            onStartQuiz
                                                        }) => {
    // Selection state
    const [selectedTestType, setSelectedTestType] = useState<string>('practice');
    const [selectedDomains, setSelectedDomains] = useState<string[]>(['all']);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [questionCount, setQuestionCount] = useState<number>(10);
    const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
    const [timerMinutes, setTimerMinutes] = useState<number>(10);

    useEffect(() => {
        if (selectedTestType === 'exam-simulation') {
            setTimerEnabled(true);
            setTimerMinutes(certification?.examInfo.timeLimit || 90);
        } else if (selectedTestType && timerEnabled) {
            setTimerMinutes(getQuestionCountForTestType());
        }
    }, [selectedTestType, certification]);

    // Show loading state if certification is not loaded yet
    if (!certification) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-pastel-aqua dark:bg-dark-900 rounded-lg shadow shadow-xl p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading certification data...</p>
                </div>
            </div>
        );
    }

    // Show message if no questions are loaded
    if (certification.totalQuestions === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div
                    className="bg-yellow-50 border-yellow-400 border dark:bg-dark-900 dark:border-yellow-700 rounded-lg shadow p-8 text-center">
                    <div className="text-yellow-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Questions Available</h2>
                    <p className="text-gray-600">Please check your database connection and ensure questions are
                        loaded.</p>
                </div>
            </div>
        );
    }

    // Get all available difficulties and categories from loaded questions
    const getAllDifficulties = (): string[] => {
        const difficulties = new Set<string>();
        certification.domains.forEach(domain => {
            domain.questions.forEach(q => difficulties.add(q.difficulty));
        });
        return Array.from(difficulties).sort();
    };

    const getAllCategories = (): string[] => {
        const categories = new Set<string>();
        certification.domains.forEach(domain => {
            domain.questions.forEach(q => categories.add(q.category));
        });
        return Array.from(categories).sort();
    };

    // Count questions that match current filters
    const getFilteredQuestionCount = (): number => {
        let questions: Question[] = [];

        // Get questions from selected domains
        if (selectedDomains.includes('all')) {
            questions = certification.domains.flatMap(domain => domain.questions);
        } else {
            questions = certification.domains
                .filter(domain => selectedDomains.includes(domain.id))
                .flatMap(domain => domain.questions);
        }

        // Apply difficulty filter
        if (selectedDifficulty !== 'all') {
            questions = questions.filter(q => q.difficulty === selectedDifficulty);
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            questions = questions.filter(q => q.category === selectedCategory);
        }

        return questions.length;
    };

    // Handle domain selection
    const handleDomainToggle = (domainId: string) => {
        if (domainId === 'all') {
            setSelectedDomains(['all']);
        } else {
            setSelectedDomains(prev => {
                const newSelection = prev.filter(id => id !== 'all');
                if (newSelection.includes(domainId)) {
                    const filtered = newSelection.filter(id => id !== domainId);
                    return filtered.length === 0 ? ['all'] : filtered;
                } else {
                    return [...newSelection, domainId];
                }
            });
        }
    };

    // Handle starting the quiz
    const handleStartQuiz = () => {
        if (!certification) return;
        const isExamSimulation = selectedTestType === 'exam-simulation';
        const config: QuizConfig = {
            testType: selectedTestType,
            selectedDomains,
            difficulty: selectedDifficulty,
            selectedCategories: [selectedCategory],
            questionCount: getQuestionCountForTestType(),
            certification: certification.id,
            timerEnabled: isExamSimulation ? true : timerEnabled,
            timerDuration: isExamSimulation ? certification.examInfo.timeLimit * 60 : (timerEnabled ? timerMinutes * 60 : 0),
            examSimulationMode: isExamSimulation
        };

        onStartQuiz(config);
    };

    // Get question count based on test type
    const getQuestionCountForTestType: () => number = (): number => {
        switch (selectedTestType) {
            case 'quick':
                return 5;
            case 'practice':
                return 10;
            case 'comprehensive':
                return 25;
            case 'domain-focused':
                return questionCount;
            case 'full-exam':
                return certification.examInfo.questionCount;
            case 'exam-simulation':
                return certification.examInfo.questionCount;
            default:
                return 10;
        }
    };

    // Test type options
    const testTypeOptions = [
        {
            value: 'quick',
            label: 'Quick Practice',
            description: '5 questions - Fast review',
            icon: '⚡',
            questions: 5
        },
        {
            value: 'practice',
            label: 'Standard Practice',
            description: '10 questions - Balanced study',
            icon: '📚',
            questions: 10
        },
        {
            value: 'comprehensive',
            label: 'Comprehensive Test',
            description: '25 questions - Deep assessment',
            icon: '🎯',
            questions: 25
        },
        {
            value: 'domain-focused',
            label: 'Custom Domain Focus',
            description: 'Custom count - Specific domains',
            icon: '🔍',
            questions: questionCount
        },
        {
            value: 'full-exam',
            label: 'Full Exam Practice',
            description: `${certification.examInfo.questionCount} questions - Complete exam practice with feedback`,
            icon: '🏆',
            questions: certification.examInfo.questionCount
        },
        {
            value: 'exam-simulation',
            label: 'Exam Simulation',
            description: `${certification.examInfo.questionCount} questions, ${certification.examInfo.timeLimit} min - Real exam experience (no feedback)`,
            icon: '🎯',
            questions: certification.examInfo.questionCount
        }
    ];

    const handleQuestionTypeSelection: (optionValue: string) => void = (optionValue: string): void => {
        setSelectedTestType(optionValue);
    }

    const availableQuestions = getFilteredQuestionCount();
    const canStartQuiz = availableQuestions > 0;

    return (
        <div className={'dark:bg-dark-600 dark:text-white bg-pastel-babyblue'}>
            <div className=" max-w-6xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                        {certification.fullName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        {certification.totalQuestions} total questions available
                        across {certification.domains.length} domains
                    </p>
                </div>

                {/* Test Type Selection */}
                <div
                    className="font-Burtons bg-pastel-mint dark:bg-dark-900 rounded-lg shadow p-6 dark:border-green-900">
                    <h2 className="text-xl font-semibold mb-4">Choose Test Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testTypeOptions.map(option => (
                            <div
                                key={option.value}
                                className={`text-xl bg-pastel-pink dark:bg-dark-900 shadow shadow-2xl p-4 rounded-lg border-2 cursor-pointer transition-all dark:shadow dark:shadow-blue-900/50 ${
                                    selectedTestType === option.value
                                        ? 'border-blue-500 bg-blue-50 dark:bg-dark-900 '
                                        : 'border-gray-200 dark:border-pastel-cream hover:border-blue-300 dark:hover:border-blue-500'
                                }`}
                                onClick={() => handleQuestionTypeSelection(option.value)}
                            >
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl mr-2">{option.icon}</span>
                                    <span className="text-gray-800 font-extrabold dark:text-white">{option.label}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                            </div>
                        ))}
                    </div>
                    {/* Custom Question Count (for domain-focused) */}
                    {selectedTestType === 'domain-focused' && (
                        <div className="bg-pastel-pink dark:bg-dark-900 rounded-lg shadow my-4">
                            <h3 className="text-lg font-semibold mb-3">Question Count</h3>
                            <input
                                type="number"
                                min="1"
                                max={availableQuestions}
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Max: {availableQuestions} available
                            </p>
                        </div>
                    )}
                </div>
                {/* Timer Configuration */}
                <div className="
                        text-black 
                        dark:bg-dark-900 
                        dark:text-white 
                        grid 
                        grid-cols-3
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        gap-6 my-4">
                    <div className=" dark:bg-dark-900 rounded-lg shadow p-6 m-4">
                        <div className="bg-pastel-mintlight dark:bg-dark-900 rounded-lg shadow">
                            <h3 className="dark:border-red-50 text-lg font-semibold mb-3 text-center">Category
                                Focus</h3>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {getAllCategories().map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>


                    </div>
                    <div
                        className="font-Burtons bg-pastel-aqua text-black bolder flex items-center rounded-lg shadow p-4 m-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Quiz Timer</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-900">
                                {selectedTestType === 'exam-simulation' 
                                    ? 'Timer automatically set to exam time limit'
                                    : 'Set a time limit for your quiz (recommended for exam simulation)'}
                            </p>
                        </div>
                        <label className={`relative inline-flex items-center ${selectedTestType === 'exam-simulation' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input
                                type="checkbox"
                                checked={timerEnabled}
                                disabled={selectedTestType === 'exam-simulation'}
                                onChange={(e) => {
                                    setTimerEnabled(e.target.checked);
                                    setTimerMinutes(getQuestionCountForTestType());
                                }}
                                className="sr-only peer"
                            />
                            <div
                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-pastel-mint after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    {timerEnabled && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                min="1"
                                max="180"
                                value={timerMinutes}
                                disabled={selectedTestType === 'exam-simulation'}
                                onChange={(e) => setTimerMinutes(Number(e.target.value))}
                                className={`w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${selectedTestType === 'exam-simulation' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                {selectedTestType === 'exam-simulation' 
                                    ? `🎯 Exam simulation: Fixed at ${certification.examInfo.timeLimit} minutes`
                                    : `💡 Exam time limit: ${certification.examInfo.timeLimit} minutes`}
                            </p>
                        </div>
                    )}
                </div>
                {/* Domain Selection */}
                <div className="font-Burtons bg-pastel-mint dark:bg-dark-900 dark:text-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Select Domains</h2>
                    <div
                        className="dark:bg-dark-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* All Domains Option */}
                        <div
                            className={`bg-pastel-mint dark:bg-dark-900 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedDomains.includes('all')
                                    ? 'border-pastel-border bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-pastel-border dark:border-gray-600 hover:border-blue-300'
                            }`}
                            onClick={() => handleDomainToggle('all')}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">All Domains</span>
                                <span className="text-2xl">🌐</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-white">
                                {certification.totalQuestions} questions total
                            </p>
                        </div>

                        {/* Individual Domain Options */}
                        {certification.domains.map(domain => (
                            <div
                                key={domain.id}
                                className={`font-Burtons dark:bg-dark-900 bg-pastel-pink p-4 rounded-lg border-2 cursor-pointer transition-all shadow shadow-2xl ${
                                    selectedDomains.includes(domain.id)
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                                }`}
                                onClick={() => handleDomainToggle(domain.id)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{domain.name}</span>
                                    <span className="text-2xl">{domain.icon}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{domain.description}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{domain.totalQuestions} questions</span>
                                    <span>Weight: {domain.weight}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Start Quiz Section */}
                <div className="font-Burtons bg-pastel-mintlight dark:bg-dark-900 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Ready to Start?</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {availableQuestions > 0 ? (
                                    <>
                                        {getQuestionCountForTestType()} questions selected
                                        from {availableQuestions} available
                                    </>
                                ) : (
                                    'No questions match your current filters'
                                )}
                            </p>
                        </div>
                        <button
                            onClick={handleStartQuiz}
                            disabled={!canStartQuiz}
                            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                                canStartQuiz
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>

                {/* Exam Information */}
                <div className="font-Burtons bg-pastel-cream dark:bg-dark-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Exam Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">
                                {certification.examInfo.questionCount}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {certification.examInfo.timeLimit} min
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Time Limit</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">
                                {certification.examInfo.passingScore}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Passing Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeginQuiz;