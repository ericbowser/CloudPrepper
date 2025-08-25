// noinspection BadExpressionStatementJS

import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './assets/styles/output.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App
            className={'dark:bg-gray-800 dark:text-white bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8'}/>
    </React.StrictMode>
);