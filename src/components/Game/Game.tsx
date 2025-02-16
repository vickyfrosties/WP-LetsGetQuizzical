import { useState } from "react";
import { QuestionsResponseWP } from "../../types";
import * as fuzzball from "fuzzball";

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

    const handleMatch = () => {
        if (!question)
            return;

        const predefinedAnswers = {
            premiere: question.reponses_acceptees || ""
        };

        const scores = Object.entries(predefinedAnswers).map(([reponse]) => ({
            reponse,
            score: fuzzball.ratio(userInput, reponse)
        }));

        const bestMatch = scores.reduce((best, current) =>
            current.score > best.score ? current : best,
            { reponse: "", score: 0 }
        );

        const isMatch = bestMatch.score >= 80;

        setResult({
            bestMatch: bestMatch.reponse,
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

    const question = questions[currentIndex];


    return (
        <>
            <div>
                <div>
                    <p> {question.question} </p>
                    {question.contenu && (
                        <div>
                            <img src={question.contenu} alt="question" />
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