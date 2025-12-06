export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Get random subset of questions
 * @param questions - Source questions array
 * @param count - Number of questions to select
 * @returns Randomly selected questions
 */
export function getRandomQuestions<T>(questions: T[], count: number): T[] {
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, Math.min(count, questions.length));
}