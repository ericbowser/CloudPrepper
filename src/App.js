import React, { useState } from 'react';
import Header from './components/Header';

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header title="React TailwindCSS Template" />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Welcome to your React App with TailwindCSS!
                    </h2>

                    <p className="text-gray-600 mb-4">
                        This template includes React, TailwindCSS, Babel, and Webpack configured and ready to use.
                        Edit <code className="bg-gray-100 px-1 rounded">src/components/App.jsx</code> to get started.
                    </p>

                    <div className="mt-6 text-center">
                        <p className="text-lg font-medium text-gray-700 mb-2">Counter: {count}</p>
                        <div className="space-x-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => setCount(count + 1)}
                            >
                                Increment
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setCount(count - 1)}
                            >
                                Decrement
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => setCount(0)}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;