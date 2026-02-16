// components/BeginQuiz.tsx - Unified Quiz Mode with Feedback Toggle
import React, {useEffect, useState} from 'react';
import type {CertificationData, Question} from '../../types/preptypes';
import {QuizConfig} from "../../types/preptypes";
import {SKILL_LEVELS_ARRAY, COGNITIVE_LEVELS_ARRAY} from '../../utils/constants';

interface DomainAllocation {
    domainId: string;
    domainName: string;
    percentage: number;
    questionCount: number;
    availableQuestions: number;
}

interface PracticeSetupProps {
    certification: CertificationData | undefined;
    onStartQuiz: (config: QuizConfig) => void;
}

export const BeginQuiz: React.FC<PracticeSetupProps> = ({
                                                            certification,
                                                            onStartQuiz
                                                        }) => {
    // Basic configuration
    const [questionCount, setQuestionCount] = useState<number>(30);
    const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
    const [timerMinutes, setTimerMinutes] = useState<number>(30);

    // ✨ NEW: Simple feedback toggle (replaces separate exam modes)
    const [showFeedbackDuringQuiz, setShowFeedbackDuringQuiz] = useState<boolean>(true);

    // Domain and filtering
    const [selectedDomains, setSelectedDomains] = useState<string[]>(['all']);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Advanced configuration
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [domainAllocations, setDomainAllocations] = useState<DomainAllocation[]>([]);
    const [selectedCognitiveLevels, setSelectedCognitiveLevels] = useState<string[]>(['all']);
    const [selectedSkillLevels, setSelectedSkillLevels] = useState<string[]>(['all']);
    const [useWeightedDomains, setUseWeightedDomains] = useState<boolean>(false);

    // Initialize domain allocations
    useEffect(() => {
        if (certification) {
            initializeDomainAllocations();
        }
    }, [certification, questionCount]);

    const initializeDomainAllocations = () => {
        if (!certification) return;

        const allocations: DomainAllocation[] = certification.domains.map(domain => {
            const weight = domain.weight || (100 / certification.domains.length);
            const questions = Math.round((weight / 100) * questionCount);
            return {
                domainId: domain.id,
                domainName: domain.name,
                percentage: weight,
                questionCount: questions,
                availableQuestions: domain.totalQuestions
            };
        });

        setDomainAllocations(allocations);
    };

    const updateDomainAllocation = (domainId: string, percentage: number) => {
        setDomainAllocations(prev => {
            const updated = prev.map(alloc => {
                if (alloc.domainId === domainId) {
                    const numQuestions = Math.round((percentage / 100) * questionCount);
                    return {...alloc, percentage, questionCount: numQuestions};
                }
                return alloc;
            });
            return updated;
        });
    };

    const autoBalanceDomains = () => {
        if (!certification) return;
        const equalPercentage = 100 / certification.domains.length;

        setDomainAllocations(prev => prev.map(alloc => ({
            ...alloc,
            percentage: equalPercentage,
            questionCount: Math.round((equalPercentage / 100) * questionCount)
        })));
    };

    const useExamWeights = () => {
        if (!certification) return;

        setDomainAllocations(prev => prev.map(alloc => {
            const domain = certification.domains.find(d => d.id === alloc.domainId);
            const weight = domain?.weight || (100 / certification.domains.length);
            return {
                ...alloc,
                percentage: weight,
                questionCount: Math.round((weight / 100) * questionCount)
            };
        }));
    };

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

    const getAllCategories = (): string[] => {
        const categories = new Set<string>();
        certification.domains.forEach(domain => {
            domain.questions.forEach(q => categories.add(q.category));
        });
        return Array.from(categories).sort();
    };

    const getCognitiveLevels = (): string[] => {
        return COGNITIVE_LEVELS_ARRAY;
    };

    const getSkillLevels = (): string[] => {
        return SKILL_LEVELS_ARRAY;
    };

    const getFilteredQuestionCount = (): number => {
        let questions: Question[] = [];

        // Get questions from selected domains (considering weighted domains if enabled)
        if (useWeightedDomains && domainAllocations.length > 0) {
            // Use weighted domain allocations
            const selectedDomainIds = domainAllocations
                .filter(alloc => alloc.percentage > 0)
                .map(alloc => alloc.domainId);
            
            if (selectedDomainIds.length > 0) {
                questions = certification.domains
                    .filter(domain => selectedDomainIds.includes(domain.id))
                    .flatMap(domain => domain.questions);
            }
        } else {
            // Use regular domain selection
            if (selectedDomains.includes('all')) {
                questions = certification.domains.flatMap(domain => domain.questions);
            } else {
                questions = certification.domains
                    .filter(domain => selectedDomains.includes(domain.id))
                    .flatMap(domain => domain.questions);
            }
        }

        // Apply difficulty filter
        if (selectedDifficulty !== 'all') {
            questions = questions.filter(q => q.difficulty === selectedDifficulty);
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            questions = questions.filter(q => q.category === selectedCategory);
        }

        // Apply cognitive level filter
        if (!selectedCognitiveLevels.includes('all')) {
            questions = questions.filter(q =>
                q.cognitive_level && selectedCognitiveLevels.some(level =>
                    q.cognitive_level?.toLowerCase() === level.toLowerCase()
                )
            );
        }

        // Apply skill level filter
        if (!selectedSkillLevels.includes('all')) {
            questions = questions.filter(q =>
                q.skill_level && selectedSkillLevels.some(level =>
                    q.skill_level?.toLowerCase() === level.toLowerCase()
                )
            );
        }

        return questions.length;
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

    const handleCognitiveLevelToggle = (level: string) => {
        if (level === 'all') {
            setSelectedCognitiveLevels(['all']);
        } else {
            setSelectedCognitiveLevels(prev => {
                const newSelection = prev.filter(l => l !== 'all');
                if (newSelection.includes(level)) {
                    const filtered = newSelection.filter(l => l !== level);
                    return filtered.length === 0 ? ['all'] : filtered;
                } else {
                    return [...newSelection, level];
                }
            });
        }
    };

    const handleSkillLevelToggle = (level: string) => {
        if (level === 'all') {
            setSelectedSkillLevels(['all']);
        } else {
            setSelectedSkillLevels(prev => {
                const newSelection = prev.filter(l => l !== 'all');
                if (newSelection.includes(level)) {
                    const filtered = newSelection.filter(l => l !== level);
                    return filtered.length === 0 ? ['all'] : filtered;
                } else {
                    return [...newSelection, level];
                }
            });
        }
    };

    const handleStartQuiz = () => {
        if (!certification) return;

        const config: QuizConfig = {
            testType: 'unified',
            selectedDomains: useWeightedDomains
                ? domainAllocations.map(a => a.domainId)
                : selectedDomains,
            difficulty: selectedDifficulty,
            selectedCategories: [selectedCategory],
            questionCount: questionCount,
            certification: certification.id,
            timerEnabled: timerEnabled,
            timerDuration: timerEnabled ? timerMinutes * 60 : 0,
            // ✨ KEY: Use feedback toggle instead of separate exam mode
            examSimulationMode: !showFeedbackDuringQuiz,
            selectedCognitiveLevels: selectedCognitiveLevels.includes('all') ? undefined : selectedCognitiveLevels,
            selectedSkillLevels: selectedSkillLevels.includes('all') ? undefined : selectedSkillLevels
        };

        onStartQuiz(config);
    };

    const availableQuestions = getFilteredQuestionCount();
    const canStartQuiz = availableQuestions > 0;
    const totalPercentage = domainAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    const isDistributionValid = Math.abs(totalPercentage - 100) < 0.1;
    console.log('domainAllocations', domainAllocations);

    return (
        <div className={'dark:bg-dark-600 dark:text-white bg-pastel-babyblue'}>
            <div className="max-w-6xl mx-auto p-6 space-y-8">
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

                {/* ✨ MAIN CONFIGURATION PANEL */}
                <div className="font-Burtons bg-pastel-mint dark:bg-dark-900 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Quiz Configuration</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Question Count */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Questions</label>
                            <input
                                type="number"
                                min="5"
                                max={availableQuestions}
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Max: {availableQuestions} available
                            </p>
                        </div>

                        {/* Timer */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium">Time Limit</label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={timerEnabled}
                                        onChange={(e) => setTimerEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-2 text-sm">Enable Timer</span>
                                </label>
                            </div>
                            {timerEnabled && (
                                <input
                                    type="number"
                                    min="5"
                                    max="180"
                                    value={timerMinutes}
                                    onChange={(e) => setTimerMinutes(Number(e.target.value))}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {timerEnabled
                                    ? `⏱️ ${timerMinutes} minutes`
                                    : '💡 Recommended: ~' + Math.round(certification.examInfo.timeLimit / certification.examInfo.questionCount * questionCount) + ' min'
                                }
                            </p>
                        </div>
                    </div>

                    {/* ✨ FEEDBACK TOGGLE - KEY FEATURE */}
                    <div
                        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Feedback Mode</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {showFeedbackDuringQuiz
                                        ? '✅ Show explanations and correct/incorrect indicators during quiz'
                                        : '🎯 Hide feedback during quiz (exam-style) - Show after submission'
                                    }
                                </p>
                            </div>
                            <label className="flex items-center cursor-pointer">
                                <span className="mr-3 text-sm font-medium">
                                    {showFeedbackDuringQuiz ? '📚 Practice' : '🎯 Exam'}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={showFeedbackDuringQuiz}
                                    onChange={(e) => setShowFeedbackDuringQuiz(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div
                                    className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* ✨ ADVANCED OPTIONS */}
                <div className="font-Burtons bg-pastel-pink dark:bg-dark-900 rounded-lg shadow p-6">
                    <button
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="flex items-center justify-between w-full"
                    >
                        <h2 className="text-xl font-semibold">Advanced Options</h2>
                        <svg
                            className={`w-6 h-6 transform transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>

                    {showAdvancedOptions && (
                        <div className="mt-6 space-y-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Category Focus</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 rounded-lg"
                                >
                                    <option value="all">All Categories</option>
                                    {getAllCategories().map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Domain Weighting */}
                            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold">Domain Distribution</h4>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={useWeightedDomains}
                                            onChange={(e) => setUseWeightedDomains(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Custom distribution</span>
                                    </label>
                                </div>

                                {useWeightedDomains && (
                                    <div className="space-y-4">
                                        <div className="flex gap-2 mb-4">
                                            <button
                                                onClick={autoBalanceDomains}
                                                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200"
                                            >
                                                ⚖️ Equal Split
                                            </button>
                                            <button
                                                onClick={useExamWeights}
                                                className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200"
                                            >
                                                🎯 Exam Weights
                                            </button>
                                        </div>

                                        {domainAllocations.map((alloc) => (
                                            <div key={alloc.domainId} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium">{alloc.domainName}</span>
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {alloc.questionCount} questions ({alloc.percentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    step="5"
                                                    value={alloc.percentage}
                                                    onChange={(e) => updateDomainAllocation(alloc.domainId, Number(e.target.value))}
                                                    className="w-full"
                                                />
                                            </div>
                                        ))}

                                        <div className={`mt-4 p-3 rounded-lg ${
                                            isDistributionValid
                                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
                                                : 'bg-red-50 dark:bg-red-900/20 border border-red-200'
                                        }`}>
                                            <p className="text-sm font-medium">
                                                Total: {domainAllocations.reduce((sum, a) => sum + a.questionCount, 0)} questions
                                                ({totalPercentage.toFixed(1)}%)
                                            </p>
                                            {!isDistributionValid && (
                                                <p className="text-xs text-red-600 mt-1">⚠️ Percentages should total
                                                    100%</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cognitive Levels */}
                            <div>
                                <h4 className="font-semibold mb-3">🧠 Cognitive Levels (Bloom's Taxonomy)</h4>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCognitiveLevelToggle('all')}
                                        className={`px-3 py-2 text-sm rounded-lg border-2 ${
                                            selectedCognitiveLevels.includes('all')
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    >
                                        All Levels
                                    </button>
                                    {getCognitiveLevels().map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => handleCognitiveLevelToggle(level)}
                                            className={`px-3 py-2 text-sm rounded-lg border-2 ${
                                                selectedCognitiveLevels.includes(level)
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Skill Levels */}
                            <div>
                                <h4 className="font-semibold mb-3">📈 Skill Levels</h4>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleSkillLevelToggle('all')}
                                        className={`px-3 py-2 text-sm rounded-lg border-2 ${
                                            selectedSkillLevels.includes('all')
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    >
                                        All Levels
                                    </button>
                                    {getSkillLevels().map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => handleSkillLevelToggle(level)}
                                            className={`px-3 py-2 text-sm rounded-lg border-2 ${
                                                selectedSkillLevels.includes(level)
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Results Summary */}
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-1">📊 Filter Results</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {availableQuestions > 0 ? (
                                                <>
                                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{availableQuestions}</span> question{availableQuestions !== 1 ? 's' : ''} available
                                                    {availableQuestions < questionCount && (
                                                        <span className="ml-2 text-orange-600 dark:text-orange-400">
                                                            (Requested: {questionCount})
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-red-600 dark:text-red-400 font-semibold">
                                                    No questions match your current filters
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Based on: {
                                                useWeightedDomains && domainAllocations.length > 0
                                                    ? `${domainAllocations.filter(a => a.percentage > 0).length} weighted domain${domainAllocations.filter(a => a.percentage > 0).length !== 1 ? 's' : ''}`
                                                    : selectedDomains.includes('all')
                                                        ? 'All Domains'
                                                        : `${selectedDomains.length} domain${selectedDomains.length !== 1 ? 's' : ''}`
                                            }
                                            {selectedDifficulty !== 'all' && ` • ${selectedDifficulty} difficulty`}
                                            {selectedCategory !== 'all' && ` • ${selectedCategory} category`}
                                            {!selectedCognitiveLevels.includes('all') && ` • ${selectedCognitiveLevels.length} cognitive level${selectedCognitiveLevels.length !== 1 ? 's' : ''}`}
                                            {!selectedSkillLevels.includes('all') && ` • ${selectedSkillLevels.length} skill level${selectedSkillLevels.length !== 1 ? 's' : ''}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Domain Selection - Hidden when using custom distribution */}
                {!useWeightedDomains && (
                    <div className="font-Burtons bg-pastel-aqua dark:bg-dark-900 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Select Domains</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div
                                className={`p-4 rounded-lg border-2 cursor-pointer ${
                                    selectedDomains.includes('all')
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                onClick={() => handleDomainToggle('all')}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">All Domains</span>
                                    <span className="text-2xl">🌐</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {certification.totalQuestions} questions total
                                </p>
                            </div>

                            {certification.domains.map(domain => (
                                <div
                                    key={domain.id}
                                    className={`p-4 rounded-lg border-2 cursor-pointer ${
                                        selectedDomains.includes(domain.id)
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-300 dark:border-gray-600'
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
                )}

                {/* Start Quiz */}
                <div className="font-Burtons bg-pastel-cream dark:bg-dark-900 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">Ready to Start?</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {availableQuestions > 0 ? (
                                    <>
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{availableQuestions}</span> question{availableQuestions !== 1 ? 's' : ''} available
                                        {' • '}Requesting: {questionCount}
                                        {' • '}{timerEnabled ? `${timerMinutes} min` : 'Untimed'}
                                        {' • '}{showFeedbackDuringQuiz ? '📚 Practice Mode' : '🎯 Exam Mode'}
                                        {availableQuestions < questionCount && (
                                            <span className="ml-2 text-orange-600 dark:text-orange-400 text-sm">
                                                ⚠️ Not enough questions available
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-red-600 dark:text-red-400 font-semibold">
                                        No questions match your current filters
                                    </span>
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
            </div>
        </div>
    );
};

export default BeginQuiz;