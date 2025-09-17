import React, {useEffect, useMemo, useState} from 'react';

const Nav: React.FC<{ activeSection: string, setActiveSection: (section: string) => void }> =
    ({
         activeSection,
         setActiveSection
     }:
     {
         activeSection: string,
         setActiveSection: (section: string) => void
     }) => {

        const [section, setActiveSectionState] = useState(activeSection);
        useEffect(() => {
        }, [section]);

        const NavTab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> =
            ({
                 label,
                 isActive,
                 onClick
             }) => (
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


        const activeSectionUpdate: (section: string) => void = (section: string) => {
            setActiveSection(section);
            setActiveSectionState(section);
        }

        return (
            <nav className="dark:bg-dark-600 dark:text-white bg-white/10 text-gray-200">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">{activeSection}</div>
                    <div className="flex gap-5">
                        <NavTab
                            label="Dashboard"
                            isActive={section === 'dashboard'}
                            onClick={() => activeSectionUpdate('dashboard')}
                        />
                        <NavTab
                            label="Practice"
                            isActive={section === 'practice'}
                            onClick={() => activeSectionUpdate('practice')}
                        />
                        <NavTab
                            label="Analytics"
                            isActive={section === 'analytics'}
                            onClick={() => activeSectionUpdate('analytics')}
                        />
                    </div>
                </div>
            </nav>
        )
    };

export default Nav;