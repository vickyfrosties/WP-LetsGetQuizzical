import { QuizzesResponseWP } from "../../types";
import styles from "./QuizOverview.module.css";

interface QuizOverviewProps {
  quiz: QuizzesResponseWP;
  onPlay: () => void;
}


const QuizOverview: React.FC<QuizOverviewProps> = ({ quiz, onPlay }) => {


  return (
    <>
      <section className={styles.quiz_container}>
        <div className={styles.quiz_game_card}>
          <h2>{quiz.title?.rendered}</h2>
          <p>Difficulté : {quiz.difficulte?.[0]}</p>
          <p>{quiz.description}</p>

          <button onClick={onPlay}>Jouer</button>

          {quiz.scoreboard && quiz.scoreboard.length > 0 ? (
            <div>
              <div>
                <p>Pseudo :</p>
                <p>Score :</p>
                <p>Temps :</p>
              </div>
              {quiz.scoreboard.map((sb) => (
                <div key={sb.ID}>
                  <p>{sb.utilisateur}</p>
                  <p>{sb.points}%</p>
                  <p>{sb.temps} / 1000</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun score enregistré.</p>
          )}
        </div>
      </section>

    </>
  );
};

export default QuizOverview;