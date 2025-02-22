import { useState } from "react";
import { QuestionsResponseWP } from "../../types";
import * as fuzzball from "fuzzball";
import styles from "./Game.module.css";

interface QuizGameProps {
    questions: QuestionsResponseWP[];
    onGameOver: (finalscore: number) => void;
}

const Game: React.FC<QuizGameProps> = ({ questions, onGameOver }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [result, setResult] = useState<{
        bestMatch: string,
        score: number,
        isMatch: boolean,
    } | null>(null);

    if (!questions || questions.length === 0) {
        return <p>Aucune question.</p>;
    }

    const question = questions[currentIndex];

    const handleMatch = () => {
        if (!question)
            return;

        const predefinedAnswers = {
            premiere: question.reponses_acceptees || ""
        };

        const scores = Object.values(predefinedAnswers).map((response) => ({
            response,
            score: fuzzball.ratio(userInput, response)
        }));

        const bestMatch = scores.reduce((best, current) =>
            current.score > best.score ? current : best,
            { response: "", score: 0 }
        );

        const isMatch = bestMatch.score >= 80;

        setResult({
            bestMatch: bestMatch.response,
            score: bestMatch.score,
            isMatch
        });

        if (isMatch) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setResult(null),
            setUserInput("");

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }

        else {
            onGameOver(score);
        }
    };




    return (
        <>
            <div>
                <div>
                    <p className={styles.text}> {question.question} </p>
                    {question.contenu && (
                        <div>
                            <p className={styles.text} >{question.contenu}</p>
                            {/* <img src={question.guid?.rendered} alt="question" /> */}
                        </div>
                    )}
                </div>

                {result && (
                    <div>
                        {result.isMatch ? (
                            <p>Bonne réponse ! C'était bien : {result.bestMatch} </p>
                        ) : (
                            <p>Mauvaise réponse, la réponse était :  {result.bestMatch} </p>
                        )}
                    </div>
                )}
                {!result && (
                    <div>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />

                        <button onClick={handleMatch}>Valider</button>
                    </div>
                )}

                {/* question suivante */}
                {result && (
                    <button onClick={handleNextQuestion}>
                        {currentIndex === questions.length - 1 ? "Terminer" : "Question suivante"}
                    </button>
                )}
            </div>
        </>
    );
};

export default Game;