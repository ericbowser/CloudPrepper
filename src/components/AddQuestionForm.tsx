// src/components/AddQuestionForm.tsx
import React, {useEffect, useState} from 'react';
import {CertificationData, QuestionOptionData} from '../types/preptypes';
import {CERTIFICATIONS} from '../config/domainConfig';

interface AddQuestionFormProps {
    onSubmit: (question: {
        category: string;
        difficulty: string;
        domain: any;
        question_text: string;
        options: QuestionOptionData[];
        correct_answer: string;
        multiple_answers: boolean;
        correct_answers: string[];
        explanation: string;
        explanation_details: { summary: string; breakdown: string[]; otherOptions: string }
    }) => Promise<boolean>;
    onCancel: () => void;
    isLoading?: boolean;
}

interface FormData {
    certification: 'comptia' | 'aws';
    domain: string;
    category: string;
    difficulty: string;
    question_text: string;
    options: QuestionOptionData[];
    multiple_answers: boolean;
    explanation: string;
    explanation_details: {
        summary: string;
        breakdown: string[];
        otherOptions: string;
    };
}

const DIFFICULTY_LEVELS = [
    'Knowledge',
    'Comprehension',
    'Application',
    'Analysis',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
];

const AddQuestionForm: React.FC<AddQuestionFormProps> = async ({
                                                                   onSubmit,
                                                                   onCancel,
                                                                   isLoading = false
                                                               }) => {
    const [formData, setFormData] = useState<FormData>({
        certification: 'comptia',
        domain: '',
        category: '',
        difficulty: 'Knowledge',
        question_text: '',
        options: [
            {text: '', isCorrect: false},
            {text: '', isCorrect: false},
            {text: '', isCorrect: false},
            {text: '', isCorrect: false}
        ],
        multiple_answers: false,
        explanation: '',
        explanation_details: {
            summary: '',
            breakdown: [''],
            otherOptions: ''
        }
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedCertification, setSelectedCertification] = useState<CertificationData | null>(null);

    // Update selected certification when form data changes
    useEffect(() => {
        const cert = CERTIFICATIONS.find(c => c.id === formData.certification);
        setSelectedCertification(cert || null);
        // Reset domain when certification changes
        if (cert && formData.domain && !cert.domains.some(d => d.id === formData.domain)) {
            setFormData(prev => ({...prev, domain: ''}));
        }
    }, [formData.certification]);

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({...prev, [field]: value}));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const handleOptionChange = (index: number, field: keyof QuestionOptionData, value: any) => {
        const newOptions = [...formData.options];
        newOptions[index] = {...newOptions[index], [field]: value};

        // Handle single-select logic
        if (field === 'isCorrect' && value && !formData.multiple_answers) {
            // Uncheck all other options for single-select
            newOptions.forEach((option, i) => {
                if (i !== index) option.isCorrect = false;
            });
        }

        setFormData(prev => ({...prev, options: newOptions}));
    };

    const addOption = () => {
        if (formData.options.length < 8) {
            setFormData(prev => ({
                ...prev,
                options: [...prev.options, {text: '', isCorrect: false}]
            }));
        }
    };

    const removeOption = (index: number) => {
        if (formData.options.length > 2) {
            const newOptions = formData.options.filter((_, i) => i !== index);
            setFormData(prev => ({...prev, options: newOptions}));
        }
    };

    const addBreakdownPoint = () => {
        setFormData(prev => ({
            ...prev,
            explanation_details: {
                ...prev.explanation_details,
                breakdown: [...prev.explanation_details.breakdown, '']
            }
        }));
    };

    const updateBreakdownPoint = (index: number, value: string) => {
        const newBreakdown = [...formData.explanation_details.breakdown];
        newBreakdown[index] = value;
        setFormData(prev => ({
            ...prev,
            explanation_details: {
                ...prev.explanation_details,
                breakdown: newBreakdown
            }
        }));
    };

    const removeBreakdownPoint = (index: number) => {
        if (formData.explanation_details.breakdown.length > 1) {
            const newBreakdown = formData.explanation_details.breakdown.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                explanation_details: {
                    ...prev.explanation_details,
                    breakdown: newBreakdown
                }
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.domain) newErrors.domain = 'Domain is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.question_text.trim()) newErrors.question_text = 'Question text is required';
        if (!formData.explanation.trim()) newErrors.explanation = 'Explanation is required';

        // Validate options
        const validOptions = formData.options.filter(opt => opt.text.trim());
        if (validOptions.length < 2) {
            newErrors.options = 'At least 2 options are required';
        }

        // Validate correct answers
        const correctOptions = formData.options.filter(opt => opt.isCorrect && opt.text.trim());
        if (correctOptions.length === 0) {
            newErrors.correct_answers = 'At least one correct answer must be selected';
        }

        if (!formData.multiple_answers && correctOptions.length > 1) {
            newErrors.correct_answers = 'Only one correct answer allowed for single-select questions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Filter out empty options
        const validOptions = formData.options.filter(opt => opt.text.trim());

        // Generate correct answer string
        const correctAnswers = validOptions
            .filter(opt => opt.isCorrect)
            .map(opt => opt.text);

        const questionData: {
            category: string;
            difficulty: string;
            domain: any;
            question_text: string;
            options: QuestionOptionData[];
            correct_answer: string;
            multiple_answers: boolean;
            correct_answers: string[];
            explanation: string;
            explanation_details: { summary: string; breakdown: string[]; otherOptions: string }
        } = {
            category: formData.category.trim(),
            difficulty: formData.difficulty,
            domain: selectedCertification?.domains.find(d => d.id === formData.domain)?.name || formData.domain,
            question_text: formData.question_text.trim(),
            options: validOptions,
            correct_answer: correctAnswers.join(', '),
            multiple_answers: formData.multiple_answers,
            correct_answers: formData.multiple_answers ? correctAnswers : [],
            explanation: formData.explanation.trim(),
            explanation_details: {
                summary: formData.explanation_details.summary.trim() || formData.explanation.trim(),
                breakdown: formData.explanation_details.breakdown.filter(point => point.trim()),
                otherOptions: formData.explanation_details.otherOptions.trim()
            }
        };

        try {
            await onSubmit(questionData);
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const handleOtherOptionsChange= async (event: any): Promise<void> => {
        const newOtherOptions = event.target.value;
        if (newOtherOptions.lenth > 0) {
            setFormData(prev => ({
                ...prev,
                explanation_details: {
                    ...prev.explanation_details,
                    otherOptions: event.target.value
                }
            }));
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-pastel-mintlight dark:bg-dark-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Add New Question
                </h2>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    disabled={isLoading}
                >
                    ✕ Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Certification and Domain Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Certification
                        </label>
                        <select
                            value={formData.certification}
                            onChange={(e) => handleInputChange('certification', e.target.value as 'comptia' | 'aws')}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white"
                            disabled={isLoading}
                        >
                            {CERTIFICATIONS.map(cert => (
                                <option key={cert.id} value={cert.id}>
                                    {cert.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Domain
                        </label>
                        <select
                            value={formData.domain}
                            onChange={(e) => handleInputChange('domain', e.target.value)}
                            className={`w-full p-3 border rounded-md bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white ${
                                errors.domain ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            disabled={isLoading}
                        >
                            <option value="">Select Domain</option>
                            {selectedCertification?.domains.map(domain => (
                                <option key={domain.id} value={domain.id}>
                                    {domain.name} ({domain.weight}%)
                                </option>
                            ))}
                        </select>
                        {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
                    </div>
                </div>

                {/* Category and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            placeholder="e.g., Cloud Architecture - Service Models"
                            className={`w-full p-3 border rounded-md bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white ${
                                errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            disabled={isLoading}
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                </div>

                {/* Question Text */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Question Text
                    </label>
                    <textarea
                        value={formData.question_text}
                        onChange={(e) => handleInputChange('question_text', e.target.value)}
                        placeholder="Enter the question text here..."
                        rows={4}
                        className={`w-full p-3 border rounded-md bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white ${
                            errors.question_text ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        disabled={isLoading}
                    />
                    {errors.question_text && <p className="text-red-500 text-sm mt-1">{errors.question_text}</p>}
                </div>

                {/* Question Type */}
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.multiple_answers}
                            onChange={(e) => handleInputChange('multiple_answers', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Multiple correct answers (Select TWO, Select THREE, etc.)
                        </span>
                    </label>
                </div>

                {/* Answer Options */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Answer Options
                        </label>
                        <button
                            type="button"
                            onClick={addOption}
                            disabled={formData.options.length >= 8 || isLoading}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            + Add Option
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={option.isCorrect}
                                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    disabled={isLoading}
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white"
                                        disabled={isLoading}
                                    />
                                </div>
                                {formData.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        disabled={isLoading}
                                        className="px-2 py-1 text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options}</p>}
                    {errors.correct_answers && <p className="text-red-500 text-sm mt-1">{errors.correct_answers}</p>}
                </div>

                {/* Explanation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Explanation
                    </label>
                    <textarea
                        value={formData.explanation}
                        onChange={(e) => handleInputChange('explanation', e.target.value)}
                        placeholder="Explain why the correct answer(s) are correct..."
                        rows={3}
                        className={`w-full p-3 border rounded-md bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white ${
                            errors.explanation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        disabled={isLoading}
                    />
                    {errors.explanation && <p className="text-red-500 text-sm mt-1">{errors.explanation}</p>}
                </div>

                {/* Detailed Explanation */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Detailed Explanation (Optional)
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Summary
                        </label>
                        <input
                            type="text"
                            value={formData.explanation_details.summary}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                explanation_details: {...prev.explanation_details, summary: e.target.value}
                            }))}
                            placeholder="Brief summary for detailed explanation..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Breakdown Points
                            </label>
                            <button
                                type="button"
                                onClick={addBreakdownPoint}
                                disabled={isLoading}
                                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                + Add Point
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.explanation_details.breakdown.map((point, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => updateBreakdownPoint(index, e.target.value)}
                                        placeholder={`Breakdown point ${index + 1}...`}
                                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white"
                                        disabled={isLoading}
                                    />
                                    {formData.explanation_details.breakdown.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeBreakdownPoint(index)}
                                            disabled={isLoading}
                                            className="px-2 py-1 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Other Options Explanation
                        </label>
                        <textarea
                            value={formData.explanation_details.otherOptions}
                            onChange={() => handleOtherOptionsChange}
                            placeholder="Explain why the other options are incorrect..."
                            rows={3}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-pastel-bluelight dark:bg-dark-700 text-gray-900 dark:text-white"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-dark-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
                    >
                        {isLoading && (
                            <div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{isLoading ? 'Adding Question...' : 'Add Question'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestionForm;