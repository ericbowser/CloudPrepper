export function QuizCard() {
    return (
        <div className="bg-pastel-mint border-2 border-pastel-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-pastel-text">Question 1</h2>
            <p className="text-pastel-textlight mt-2">What is AWS S3?</p>
            <button className="mt-4 bg-pastel-mint hover:bg-pastel-cyan text-pastel-text px-4 py-2 rounded">
                Submit Answer
            </button>
        </div>
    );
}

export default QuizCard;