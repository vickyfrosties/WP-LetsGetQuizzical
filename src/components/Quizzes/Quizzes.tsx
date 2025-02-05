import { useEffect, useState } from "react";
import { QuizzesResponseWP } from "../../types/Quizzes";
import { getAllQuizzes } from "../../services/Quizzes.services";
import Game from "../Game/Game";

const Quizzes = () => {

    const [quizzes, setQuizzes] = useState<QuizzesResponseWP[]>([]);

    useEffect(() => {
        getAllQuizzes()
            .then((quizzes) => {
                console.log(quizzes);
                setQuizzes(quizzes);
            })
            .catch(err => console.error("Erreur de chargement des quizzes", err));
    }, []);

    return (
        <>
            <h2>Liste des quizzes</h2>
            <section>
                {quizzes?.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz.id}>
                            <h3>{quiz.titre ?? quiz.titre?.rendered}</h3>
                            {quiz.image && (
                                <img style={{ width: 600 }} src={quiz.image.guid ?? ""} alt="" />
                            )}
                            <p>{quiz.description}</p>
                            <p>Difficulté du quiz : {quiz.difficulte} </p>
                            <p>Dernier statut du quiz : {quiz.statut} </p>
                            <Game />
                        </div>
                    ))
                ) : (
                    <p>Aucun quiz disponible.</p>
                )}
            </section>
        </>
    );
};

export default Quizzes;