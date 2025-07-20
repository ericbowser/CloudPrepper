import React, {ReactElement, useState, useEffect} from 'react';
import {SectionType} from "@/types/preptypes";

const Nav: React.FC<{ setActiveSection: (section: string) => void; activeSection: string }> = ({ setActiveSection, activeSection }) => {
    return (
        <nav className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">CompTIA Cloud+ Prep</div>
                <div className="flex gap-5">
                    <NavTab
                        label="Dashboard"
                        isActive={activeSection === 'dashboard'}
                        onClick={() => setActiveSection('dashboard')}
                    />
                    <NavTab
                        label="Practice"
                        isActive={activeSection === 'practice'}
                        onClick={() => setActiveSection('practice')}
                    />
                    <NavTab
                        label="Analytics"
                        isActive={activeSection === 'analytics'}
                        onClick={() => setActiveSection('analytics')}
                    />
                </div>
            </div>
        </nav>
    )
};

// Sub-components
const NavTab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
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

export default Nav;