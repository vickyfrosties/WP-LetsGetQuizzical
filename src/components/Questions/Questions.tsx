import { useEffect, useState } from "react";
import { QuizzesResponseWP } from "../../types";
import { Link, useParams } from "react-router-dom";
import { getQuizById } from "../../services/Quizzes.services";
import QuizOverview from "../Overview/QuizOverview";
import Game from "../Game/Game";
import styles from "./Questions.module.css";
import { postScore } from "../../services/Scoresboard.service";
// import { postScore } from "../../services/Scoresboard.service";

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
        })();
    }, [id]);

    if (error) {
        return <p>Erreur : {error} </p>;
    }
    if (!quiz) {
        return <p>Chargement... </p>;
    }

    const handlePlay = () => {
        setMode("play");
        setFinalScore(null);
        setElapsedtime(null);
        setStartTime(Date.now());
    };

    const handleGameOver = async (points: number) => {
        setFinalScore(points);
        setMode("end");

        if (startTime) {
            const endTime = Date.now();
            const totalMs = endTime - startTime;
            setElapsedtime(totalMs);
        }

        try {
            await postScore(finalScore, totalQuestions, percentage);
            console.log("Score enregistré avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }

    };

    const totalQuestions = quiz.association_avec_les_questions?.length || 0;
    const percentage = finalScore !== null && totalQuestions > 0 ? Math.round(finalScore / totalQuestions * 100).toFixed(2) : null;

    const elapsedSeconds = elapsedTime ? (elapsedTime / 1000).toFixed(2) : null;

    return (
        <>
            <div>
                {mode === "overview" && (
                    <QuizOverview quiz={quiz} onPlay={handlePlay} />
                )}

                {mode === "play" && quiz?.association_avec_les_questions && quiz.association_avec_les_questions.length > 0 && (
                    <Game questions={quiz.association_avec_les_questions} onGameOver={handleGameOver} />
                )}

                {mode === "end" && (
                    <div className={styles.end_game}>
                        <h2>Partie terminée</h2>
                        <p> Nombre de bonnes réponses : {finalScore} sur {totalQuestions} </p>
                        <p>Score final : {percentage}% </p>
                        {elapsedSeconds && <p>Temps écoulé : {elapsedSeconds} secondes </p>}

                        <button onClick={() => setMode("overview")}>Voir l'aperçu</button>
                    </div>
                )}
            </div>

            <div className={styles.button_container}>
                <Link className={styles.go_back} to="/">
                    <button>
                        Retour à la liste
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Questions;