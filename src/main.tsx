import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/output.css';
import {ThemeProvider} from "./contexts/ThemeContext";
import CloudPrepApp from "./App";

// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <div className={'font-burtons'}>
                <CloudPrepApp />
            </div>
        </ThemeProvider>
    </React.StrictMode>
)