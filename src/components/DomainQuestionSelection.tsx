// src/components/DomainQuestionSelection.tsx
import React, {useEffect, useState} from 'react';
import {AnswerRecord, CertificationData, Domain, Question, QuizConfig} from '../types/preptypes';
import {
    getAllQuestionsByDifficulty,
    getAwsQuestionsByCategory,
    getAwsQuestionsByDifficulty,
    getAwsQuestionStats,
    getCompTiaQuestionsByCategory,
    getCompTiaQuestionsByDifficulty,
    getCompTiaQuestionStats
} from '../helpers/utils';

interface DomainQuestionSelectionProps {
    certification: CertificationData;
    userAnswers: AnswerRecord[];
    onStartQuiz: (questions: Question[], config: QuizConfig) => void;
    onCertificationChange: (cert: 'comptia' | 'aws') => void;
}

interface DomainStats {
    domain: Domain;
    attempted: number;
    correct: number;
    accuracy: number;
    needsWork: boolean;
}

export const DomainQuestionSelection: React.FC<DomainQuestionSelectionProps> = ({
                                                                                    certification,
                                                                                    userAnswers,
                                                                                    onStartQuiz,
                                                                                    onCertificationChange
                                                                                }) => {
    const [selectedTestType, setSelectedTestType] = useState('practice');
    const [selectedDomains, setSelectedDomains] = useState<string[]>(['all']);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [questionCount, setQuestionCount] = useState(10);
    const [domainStats, setDomainStats] = useState<DomainStats[]>([]);

    useEffect(() => {
        const stats = certification.domains.map(domain => {
            // You could create domain-specific stats using your utility functions
            const domainQuestions = domain.questions;
            const domainAnswers = userAnswers.filter(ans =>
                domainQuestions.some(q => q.questionNumber === ans.questionIndex + 1)
            );
            const correctAnswers = domainAnswers.filter(ans => ans.isCorrect);
            const accuracy = domainAnswers.length > 0 ?
                Math.round((correctAnswers.length / domainAnswers.length) * 100) : 0;

            return {
                domain,
                attempted: domainAnswers.length,
                correct: correctAnswers.length,
                accuracy,
                needsWork: accuracy < 70 && domainAnswers.length >= 3
            };
        });
        setDomainStats(stats);
    }, [certification, userAnswers]);

    const getAllDifficulties = (): string[] => {
        if (certification.id === 'comptia') {
            const stats = getCompTiaQuestionStats();
            return Object.keys(stats.byDifficulty); // Convert object keys to array
        } else {
            const stats = getAwsQuestionStats();
            return Object.keys(stats.byDifficulty); // Convert object keys to array
        }
    };

    const getAllCategories = (): string[] => {
        if (certification.id === 'comptia') {
            const stats = getCompTiaQuestionStats();
            return stats.categories; // Should already be an array
        } else {
            const stats = getAwsQuestionStats();
            return stats.categories; // Should already be an array
        }
    };

    const getFilteredQuestions = (): Question[] => {
        let questions: Question[] = [];

        // Use utility functions based on certification type
        if (certification.id === 'comptia') {
            if (selectedCategory !== 'all') {
                questions = getCompTiaQuestionsByCategory(selectedCategory);
            } else if (selectedDifficulty !== 'all') {
                questions = getCompTiaQuestionsByDifficulty(selectedDifficulty);
            } else {
                // Get all CompTIA questions - you may need to add this utility
                questions = certification.domains.flatMap(domain => domain.questions);
            }
        } else {
            if (selectedCategory !== 'all') {
                questions = getAwsQuestionsByCategory(selectedCategory);
            } else if (selectedDifficulty !== 'all') {
                questions = getAwsQuestionsByDifficulty(selectedDifficulty);
            } else {
                // Get all AWS questions:/
                questions = certification.domains.flatMap(domain => domain.questions);
            }
        }

        // Apply domain filter if not 'all'
        if (!selectedDomains.includes('all')) {
            questions = questions.filter(q =>
                selectedDomains.some(domainId =>
                    certification.domains.find(d => d.id === domainId)?.questions.includes(q)
                )
            );
        }

        return questions;
    };

    // Generate quiz questions based on test type
    const generateQuizQuestions = (): Question[] => {
        let questions = getFilteredQuestions();
        let count = questionCount;

        switch (selectedTestType) {
            case 'quick':
                count = 5;
                break;
            case 'practice':
                count = 10;
                break;
            case 'comprehensive':
                count = 25;
                break;
            case 'domain-focused':
                count = questionCount;
                break;
            case 'weak-areas':
                // Focus on domains that need work
                const weakDomains = domainStats.filter(stat => stat.needsWork);
                if (weakDomains.length > 0) {
                    questions = weakDomains.flatMap(stat => stat.domain.questions);
                    count = 15;
                } else {
                    count = 10;
                }
                break;
            case 'balanced':
                // Get proportional questions from each domain based on exam weight
                questions = [];
                const totalWeight = certification.domains.reduce((sum, domain) => sum + (domain.weight || 0), 0);
                certification.domains.forEach(domain => {
                    const domainQuestionCount = Math.ceil((count * (domain.weight || 0)) / totalWeight);
                    const domainQuestions = domain.questions
                        .sort(() => 0.5 - Math.random())
                        .slice(0, domainQuestionCount);
                    questions.push(...domainQuestions);
                });
                return questions.slice(0, count);
            case 'full-exam':
                count = certification.examInfo.questionCount;
                break;
        }

        // Shuffle and return the requested number of questions
        return questions.sort(() => 0.5 - Math.random()).slice(0, Math.min(count, questions.length));
    };

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

    const handleStartQuiz = () => {
        const questions = generateQuizQuestions();
        const config: QuizConfig = {
            testType: selectedTestType,
            selectedDomains,
            difficulty: selectedDifficulty,
            category: selectedCategory,
            questionCount,
            certification: certification.id
        };
        onStartQuiz(questions, config);
    };

    const testTypeOptions = [
        {
            value: 'quick',
            label: 'Quick Practice (5 questions)',
            description: 'Fast review session',
            icon: '⚡'
        },
        {
            value: 'practice',
            label: 'Standard Practice (10 questions)',
            description: 'Balanced study session',
            icon: '📚'
        },
        {
            value: 'comprehensive',
            label: 'Comprehensive (25 questions)',
            description: 'Deep knowledge assessment',
            icon: '🎯'
        },
        {
            value: 'balanced',
            label: 'Balanced by Domain (15 questions)',
            description: 'Questions weighted by exam importance',
            icon: '⚖️'
        },
        {
            value: 'domain-focused',
            label: 'Domain Focused (Custom)',
            description: 'Focus on specific domains',
            icon: '🔍'
        },
        {
            value: 'weak-areas',
            label: 'Weak Areas Focus (15 questions)',
            description: 'Target your problem areas',
            icon: '🎪',
            disabled: !domainStats.some(stat => stat.needsWork)
        },
        {
            value: 'full-exam',
            label: `Full Exam Simulation (${certification.examInfo.questionCount} questions)`,
            description: 'Complete exam experience',
            icon: '🏆'
        }
    ];

    const filteredQuestions = getFilteredQuestions();

    return (
        <div
            className="dark:bg-gray-800 dark:text-white bg-gradient-to-tr text-xl text-white max-w-6xl mx-auto space-y-6">
            {/* Certification Header */}
            <div className="backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700">
                <div className="dark:text-white dark:bg-gray-800 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            {certification.icon} {certification.name}
                        </h1>
                        <p className="text-gray-600">{certification.fullName} ({certification.code})</p>
                    </div>
                    <select
                        value={certification.id}
                        onChange={(e) => onCertificationChange(e.target.value as 'comptia' | 'aws')}
                        className="dark:bg-gray-800 dark:text-white bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    >
                        <option value="comptia">☁️ CompTIA Cloud+</option>
                        <option value="aws">🏗️ AWS Solutions Architect</option>
                    </select>
                </div>
            </div>

            {/* Domain Overview */}
            <div
                className="dark:bg-gray-800 dark:text-white bg-gradient-to-tr text-xl text-black bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Domain Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {domainStats.map((stat, index) => (
                        <div
                            key={stat.domain.id}
                            className={`dark:bg-gray-800 dark:text-white p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedDomains.includes(stat.domain.id) || selectedDomains.includes('all')
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                            } ${stat.needsWork ? 'ring-2 ring-orange-200' : ''}`}
                            onClick={() => handleDomainToggle(stat.domain.id)}
                        >
                            <div className="dark:text-white dark:bg-gray-800 flex items-start justify-between mb-2">
                                <div className="dark:text-white dark:bg-gray-800 flex items-center gap-2">
                                    <span className="text-xl">{stat.domain.icon}</span>
                                    <div>
                                        <div className="font-semibold text-gray-800">{stat.domain.name}</div>
                                        <div className="text-xs text-gray-500">{stat.domain.weight}% of exam</div>
                                    </div>
                                </div>
                                {stat.needsWork && (
                                    <span
                                        className="dark:bg-gray-800 dark:text-white text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                        Needs work
                                    </span>
                                )}
                            </div>

                            <div className="dark:text-white dark:bg-gray-800 text-sm text-gray-200 mb-2">
                                {stat.domain.totalQuestions} questions available
                            </div>

                            {stat.attempted > 0 && (
                                <div className="space-y-2">
                                    <div className="dark:bg-gray-800 dark:text-white flex justify-between text-sm">
                                        <span>Progress:</span>
                                        <span>{stat.attempted}/{stat.domain.totalQuestions}</span>
                                    </div>
                                    <div
                                        className="dark:bg-gray-800 dark:text-white w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${
                                                stat.accuracy >= 80 ? 'bg-green-500' :
                                                    stat.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{width: `${(stat.attempted / stat.domain.totalQuestions) * 100}%`}}
                                        />
                                    </div>
                                    <div className="dark:text-white dark:bg-gray-800 text-sm text-center">
                                        <span className={`font-medium ${
                                            stat.accuracy >= 80 ? 'text-green-600' :
                                                stat.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {stat.accuracy}% accuracy
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Select All/None buttons */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => setSelectedDomains(['all'])}
                        className="dark:bg-white/95 dark:text-gray-800 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                        Select All Domains
                    </button>
                    <button
                        onClick={() => setSelectedDomains([])}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
            </div>

            {/* Test Configuration */}
            <div
                className="dark:bg-gray-800 dark:text-white bg-gradient-to-tr text-xl text-black bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="dark:text-white dark:bg-gray-800 text-2xl font-bold mb-6 text-gray-800">Configure Your
                    Practice Test</h2>

                {/* Test Type Selection */}
                <div className="mb-6">
                    <label className="dark:text-white dark:bg-gray-800 block text-sm font-medium text-gray-700 mb-3">
                        Test Type
                    </label>
                    <div
                        className="dark:bg-gray-800 dark:text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {testTypeOptions.map(option => (
                            <div
                                key={option.value}
                                className={`dark:bg-gray-800 dark:text-white p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                    option.disabled ? 'opacity-50 cursor-not-allowed border-gray-200' :
                                        selectedTestType === option.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                }`}
                                onClick={() => !option.disabled && setSelectedTestType(option.value)}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{option.icon}</span>
                                    <div
                                        className="dark:text-white dark:bg-gray-800 font-medium text-gray-800">{option.label}</div>
                                </div>
                                <div className="dark:text-white dark:bg-gray-800 text-sm text-gray-600">
                                    {option.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Difficulty Filter */}
                    <div>
                        <label
                            className="dark:text-white dark:bg-gray-800 block text-sm font-medium text-gray-700 mb-2">Difficulty
                            Level</label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="dark:text-white dark:bg-gray-800 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Difficulty Levels</option>
                            {getAllQuestionsByDifficulty(selectedDifficulty)}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label
                            className="dark:text-white dark:bg-gray-800 block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="dark:text-white dark:bg-gray-800 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Categories</option>
                            {getAllCategories()}
                        </select>
                    </div>
                </div>

                {/* Custom Question Count */}
                {selectedTestType === 'domain-focused' && (
                    <div className="mb-6">
                        <label
                            className="dark:text-white dark:bg-gray-800 block text-sm font-medium text-gray-700 mb-2">
                            Number of Questions ({questionCount})
                        </label>
                        <input
                            type="range"
                            min="5"
                            max={Math.min(50, filteredQuestions.length)}
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            className="dark:text-white dark:bg-gray-900 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div
                            className="dark:text-white dark:bg-gray-800 flex justify-between text-sm text-gray-500 mt-1">
                            <span>5</span>
                            <span>{Math.min(50, filteredQuestions.length)}</span>
                        </div>
                    </div>
                )}

                {/* Quiz Preview */}
                <div className="dark:bg-gray-800 dark:text-white bg-gray-50 rounded-lg p-4 mb-6">
                    <div
                        className="dark:text-white dark:bg-gray-800 flex justify-between items-text-sm text-gray-600 space-y-1">
                        <div><strong>Available Questions:</strong> {filteredQuestions.length}</div>
                        <div><strong>Selected Domains:</strong> {
                            selectedDomains.includes('all') ? 'All Domains' :
                                selectedDomains.map(id =>
                                    certification.domains.find(d => d.id === id)?.name
                                ).join(', ')
                        }</div>
                        <div><strong>Quiz Length:</strong> {
                            selectedTestType === 'quick' ? '5 questions' :
                                selectedTestType === 'practice' ? '10 questions' :
                                    selectedTestType === 'comprehensive' ? '25 questions' :
                                        selectedTestType === 'balanced' ? '15 questions' :
                                            selectedTestType === 'weak-areas' ? '15 questions' :
                                                selectedTestType === 'full-exam' ? `${certification.examInfo.questionCount} questions` :
                                                    `${questionCount} questions`
                        }</div>
                        <div><strong>Estimated Time:</strong> {
                            selectedTestType === 'quick' ? '5-10 minutes' :
                                selectedTestType === 'practice' ? '10-15 minutes' :
                                    selectedTestType === 'comprehensive' ? '25-35 minutes' :
                                        selectedTestType === 'balanced' ? '15-25 minutes' :
                                            selectedTestType === 'weak-areas' ? '15-20 minutes' :
                                                selectedTestType === 'full-exam' ? `${certification.examInfo.timeLimit} minutes` :
                                                    `${Math.ceil(questionCount * 1.5)} minutes`
                        }</div>
                    </div>
                </div>

                {/* Start Quiz Button */}
                <button
                    onClick={handleStartQuiz}
                    disabled={filteredQuestions.length === 0}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {filteredQuestions.length === 0 ? 'No questions match your criteria' :
                        `Start ${selectedTestType === 'full-exam' ? 'Exam Simulation' : 'Practice Test'}`}
                </button>
            </div>
        </div>
    );
};