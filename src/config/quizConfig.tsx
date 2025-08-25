import React, {useState} from 'react';
import {Question} from '@/types/preptypes';

interface QuizConfigProps {
    onStartQuiz: (questions: Question[], testType: string) => void;
    allQuestions: Question[];
}

export const QuizConfig: React.FC<QuizConfigProps> = ({onStartQuiz, allQuestions}) => {
    const [selectedTestType, setSelectedTestType] = useState<string>('quick');
    const [selectedDomain, setSelectedDomain] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [questionCount, setQuestionCount] = useState<number>(10);

    const getRandomQuestions = (questions: Question[], count: number): Question[] => {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, questions.length));
    };

    const filterQuestions = (): Question[] => {
        let filtered = [...allQuestions];

        if (selectedDomain !== 'all') {
            filtered = filtered.filter(q => q.domain === selectedDomain);
        }

        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
        }

        return filtered;
    };

    const generateQuizQuestions = (): Question[] => {
        const filtered = filterQuestions();

        switch (selectedTestType) {
            case 'quick':
                return getRandomQuestions(filtered, 5);
            case 'practice':
                return getRandomQuestions(filtered, 10);
            case 'comprehensive':
                return getRandomQuestions(filtered, 25);
            case 'domain-focused':
                return getRandomQuestions(filtered, questionCount);
            case 'full-exam':
                return getRandomQuestions(allQuestions, 100); // Full CompTIA exam simulation
            default:
                return getRandomQuestions(filtered, questionCount);
        }
    };

    const handleStartQuiz = () => {
        const questions = generateQuizQuestions();
        onStartQuiz(questions, selectedTestType);
    };

    // Get unique domains and difficulties
    const domains = [...new Set(allQuestions.map(q => q.domain))];
    const difficulties = [...new Set(allQuestions.map(q => q.difficulty))];

    const testTypeOptions = [
        {value: 'quick', label: 'Quick Test (5 questions)', description: 'Fast knowledge check'},
        {value: 'practice', label: 'Practice Test (10 questions)', description: 'Standard study session'},
        {value: 'comprehensive', label: 'Comprehensive (25 questions)', description: 'Deep knowledge assessment'},
        {value: 'domain-focused', label: 'Domain Focused (Custom)', description: 'Focus on specific areas'},
        {value: 'full-exam', label: 'Full Exam Simulation (100 questions)', description: 'Complete exam experience'}
    ];

    return (
        <div
            className="dark:bg-gray-800 dark:text-white bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Configure Your Practice Test</h2>

            {/* Test Type Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Test Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {testTypeOptions.map(option => (
                        <div
                            key={option.value}
                            className={`dark:bg-gray-800 dark:text-white p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedTestType === option.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => setSelectedTestType(option.value)}
                        >
                            <div className="font-medium text-gray-800">{option.label}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Domain Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Focus</label>
                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">All Domains</option>
                    {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                    ))}
                </select>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">All Difficulty Levels</option>
                    {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                </select>
            </div>

            {/* Custom Question Count (for domain-focused) */}
            {selectedTestType === 'domain-focused' && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Questions ({questionCount})
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>5</span>
                        <span>50</span>
                    </div>
                </div>
            )}

            {/* Quiz Preview Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600">
                    <div><strong>Available Questions:</strong> {filterQuestions().length}</div>
                    <div><strong>Quiz Length:</strong> {
                        selectedTestType === 'quick' ? '5 questions' :
                            selectedTestType === 'practice' ? '10 questions' :
                                selectedTestType === 'comprehensive' ? '25 questions' :
                                    selectedTestType === 'full-exam' ? '100 questions' :
                                        `${questionCount} questions`
                    }</div>
                    <div><strong>Estimated Time:</strong> {
                        selectedTestType === 'quick' ? '5-10 minutes' :
                            selectedTestType === 'practice' ? '10-15 minutes' :
                                selectedTestType === 'comprehensive' ? '25-35 minutes' :
                                    selectedTestType === 'full-exam' ? '90 minutes' :
                                        `${Math.ceil(questionCount * 1.5)} minutes`
                    }</div>
                </div>
            </div>

            {/* Start Quiz Button */}
            <button
                onClick={handleStartQuiz}
                disabled={filterQuestions().length === 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {filterQuestions().length === 0 ? 'No questions match your criteria' : 'Start Practice Test'}
            </button>
        </div>
    );
};