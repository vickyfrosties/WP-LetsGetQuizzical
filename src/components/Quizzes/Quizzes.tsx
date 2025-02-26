import { useEffect, useState } from "react";
import { getAllQuizzes } from "../../services/Quizzes.services";
import { QuizzesResponseWP } from "../../types";
import { Link } from "react-router-dom";
import styles from "./Quizzes.module.css";

const Quizzes: React.FC = () => {

    const [quizzes, setQuizzes] = useState<QuizzesResponseWP[]>([]);

    useEffect(() => {
        getAllQuizzes()
            .then((quizzes) => {
                setQuizzes(quizzes);
            })
            .catch(err => console.error("Erreur de chargement des quizzes", err));
    }, []);

    return (
        <>
            <h2 className={styles.subtitle}>Les Quizzes</h2>
            <section className={styles.quizzes_section}>
                {quizzes?.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div className={styles.quizzes_cards} key={quiz.id}>
                            <h3 className={styles.quizz_title}>{quiz.titre ?? quiz.titre?.rendered}</h3>
                            {quiz.image && (
                                <img className={styles.illustration} src={quiz.image[0]?.guid} alt="" />
                            )}
                            <p>{quiz.description}</p>
                            <p>Difficulté du quiz : {quiz.difficulte?.[0]} </p>
                            <p>Dernier statut du quiz : {quiz.statut} </p>
                            <Link className={styles.start_btn} to={`/quiz/${quiz.id}`}>
                                <button>
                                    Plus d'informations
                                </button>
                            </Link>
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