import React from 'react';
import {SectionType} from "@/types/preptypes";
import {CERTIFICATIONS} from "../config/domainConfig";

const Nav: React.FC<{
    setActiveSection: (section: SectionType) => void,
    activeSection: string,
    setCu
    darkMode: string,
}> = (
    {
        setActiveSection,
        activeSection,
        darkMode
    }) => {
    // Get current certification data
    const getCurrentCertification = () => {
        const cert = CERTIFICATIONS.find(cert => cert.id === currentCertification)!;
        console.log("current certification: ", cert);
        return cert;
    }
    return (
        <nav className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">{activeSection}</div>
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
const NavTab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({label, isActive, onClick}) => (
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