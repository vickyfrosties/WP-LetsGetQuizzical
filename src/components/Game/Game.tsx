import { Link } from "react-router-dom";
import { QuestionsResponseWP } from "../../types/Questions";

interface QuestionProps {
    questions: QuestionsResponseWP[];
}

const Game: React.FC<QuestionProps> = ({ questions }) => {



    return (
        <>
            <Link to="/quizzes/:id">Commencer le quiz</Link>

        </>
    );
};

export default Game;