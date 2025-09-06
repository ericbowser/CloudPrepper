import React from "react";
import {AnswerRecord} from "../types/preptypes";

export function Dashboard(userAnswers: AnswerRecord[] | null, length: number) {
    if (userAnswers?.length === 0 || userAnswers === undefined) return null;
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{userAnswers?.length ?? 0}</div>
                    <div className="text-gray-600 font-medium">Questions Completed</div>
                </div>
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                        {Array.isArray(userAnswers) && userAnswers.length > 0
                            ? Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100)
                            : 0}%
                    </div>
                    <div className="text-gray-600 font-medium">Accuracy</div>
                </div>
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                    <div className="text-gray-600 font-medium">Study Streak</div>
                </div>
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                        {Array.isArray(userAnswers)
                            ? Math.min(100, Math.round((userAnswers.filter(a => a.isCorrect).length / length) * 100))
                            : 0}%
                    </div>
                    <div className="text-gray-600 font-medium">Exam Readiness</div>
                </div>
            </div>
        </div>
    );
}