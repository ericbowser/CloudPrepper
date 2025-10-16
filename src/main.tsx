import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/styles/output.css';
import {ThemeProvider} from "./Theme/ThemeContext";
import CloudPrepApp from "./App";
import {QuestionProvider} from "./components/Question/QuestionContext";
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {queryClient} from './lib/queryClient';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {AdminPage} from './components/pages/AdminPage';

// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <QuestionProvider>
                    <BrowserRouter>
                        <div className={'font-thin font-light'}>
                            {/* Navigation */}
                            <nav className="bg-gradient-to-r from-slate-900 to-purple-900 border-b border-white/10">
                                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                                    <div className="flex gap-6">
                                        <Link
                                            to="/"
                                            className="text-white hover:text-blue-300 transition-colors font-medium"
                                        >
                                            Quiz
                                        </Link>
                                        <Link
                                            to="/admin"
                                            className="text-white hover:text-blue-300 transition-colors font-medium"
                                        >
                                            Admin
                                        </Link>
                                    </div>
                                    <div className="text-white/60 text-sm">
                                        CloudPrepper - Certification Study Tool
                                    </div>
                                </div>
                            </nav>

                            {/* Routes */}
                            <Routes>
                                <Route path="/" element={<CloudPrepApp/>}/>
                                <Route path="/admin" element={<AdminPage/>}/>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </QuestionProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>
)