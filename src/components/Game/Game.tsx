import { QuestionsResponseWP } from "../../types/Questions";

interface QuestionProps {
    questions: QuestionsResponseWP[];
}

const Game: React.FC<QuestionProps> = ({ questions }) => {

    return (
        <>
            <div>
                <p>{questions.map((question) => (
                    <div key={question.id}>
                        <p> {question.question} </p>
                    </div>
                ))} </p>
            </div>
        </>
    );
};

export default Game;