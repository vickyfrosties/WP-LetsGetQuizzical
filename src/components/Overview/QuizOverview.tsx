import { QuizzesResponseWP } from "../../types";

interface QuizOverviewProps {
  quiz: QuizzesResponseWP;
  onPlay: () => void;
}


const QuizOverview: React.FC<QuizOverviewProps> = ({ quiz, onPlay }) => {


  return (
    <>
      <div>
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

    </>
  );
};

export default QuizOverview;