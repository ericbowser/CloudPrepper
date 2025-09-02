import React from 'react';
import {CertificationData, SectionType} from '../types/preptypes';
import {BsFillMoonStarsFill} from 'react-icons/bs';

interface NavProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    certification: CertificationData;
    activeSection: SectionType;
    setActiveSection: (section: SectionType) => void;
    isPracticeDisabled: boolean;
    isResultsDisabled: boolean;
    currentCertificationId: 'comptia' | 'aws';
    onCertificationChange: (newCert: 'comptia' | 'aws') => void;
}

const Nav: React.FC<NavProps> = ({
                                     darkMode,
                                     setDarkMode,
                                     certification,
                                     activeSection,
                                     setActiveSection,
                                     isPracticeDisabled,
                                     isResultsDisabled,
                                     currentCertificationId,
                                     onCertificationChange,
                                 }) => {
    return (
        <nav
            className="text-2xl font-bold backdrop-blur-sm border-b border-black/10 dark:border-white/10 sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-between justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <div>
                            <BsFillMoonStarsFill className={'cursor-pointer 2xl'}
                                                 onClick={() => setDarkMode(!darkMode)}/>
                        </div>
                        <div>
                            {certification.name}
                        </div>
                        <div className="md:flex space-x-6">
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
                                disabled={isPracticeDisabled}
                                className={`nav-link disabled:opacity-50 ${
                                    activeSection === 'practice' ? 'nav-link-active' : ''
                                }`}
                            >
                                ✏️ Practice
                            </button>
                            <button
                                onClick={() => setActiveSection('results')}
                                disabled={isResultsDisabled}
                                className={`nav-link disabled:opacity-50 ${
                                    activeSection === 'results' ? 'nav-link-active' : ''
                                }`}
                            >
                                📊 Results
                            </button>
                        </div>
                    </div>

                    {/* Certification Switcher */}
                    <div className="mx-2 w-full">

                        <select
                            id="certification"
                            name="certification"
                            value={currentCertificationId}
                            onChange={(e) => onCertificationChange(e.target.value as 'comptia' | 'aws')}
                            className="form-select"
                        >
                            <option value="comptia">☁️ CompTIA Cloud+</option>
                            <option value="aws">🏗️ AWS Solutions Architect</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;