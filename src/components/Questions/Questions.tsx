import { useEffect, useState } from "react";
import { QuizzesResponseWP } from "../../types";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/Quizzes.services";
import QuizOverview from "../Overview/QuizOverview";

const Questions: React.FC = () => {

    const { id } = useParams();
    const [quiz, setQuiz] = useState<QuizzesResponseWP | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [mode, setMode] = useState<"overview" | "play" | "end">("overview");

    const [finalScore, setFinalScore] = useState<number | null>(null);

    const [startTime, setStartTime] = useState<number | null>(null);

    const [elapsedTime, setElapsedtime] = useState<number | null>(null);

    // récupérer le quiz avec useEffect
    useEffect(() => {
        if (!id)
            return;

        (async () => {
            try {
                const quizId = parseInt(id, 10);
                const data = await getQuizById(quizId);
                setQuiz(data);
            }
            catch (error: any) {
                setError(error.message);
            }
        });
    }, [id]);

    const totalQuestions = quiz?.questions?.length || 0;
    const percentage = finalScore !== null && totalQuestions > 0 ? Math.round(finalScore / totalQuestions * 100) : 0;

    const elapsedSeconds = elapsedTime ? (elapsedTime / 1000).toFixed(2) : null;

    return (
        <>
            <div>
                {mode === "overview" && (
                    <QuizOverview quiz={quiz} onPlay={handlePlay} />
                )}
            </div>
        </>
    );
};

export default Questions;