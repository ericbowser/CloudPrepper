import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/output.css';
import {ThemeProvider} from "./contexts/ThemeContext";
import CloudPrepApp from "./App";
import {QuestionProvider} from "./contexts/QuestionContext";

// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <QuestionProvider>
                <div className={'font-burtons'}>
                    <CloudPrepApp />
                </div>
            </QuestionProvider>
        </ThemeProvider>
    </React.StrictMode>
)