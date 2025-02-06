import { QuestionsResponseWP } from "../../types/Questions";

interface QuestionProps {
    questions: QuestionsResponseWP[];
}

const Questions: React.FC<QuestionProps> = ({ questions }) => {
    // si questions existe pas ou s'il n'y a aucune questions dans le tableau alors affiche 'aucune question'
    if (!questions || questions.length === 0) {
        <p>Aucune question.</p>;
    }

    return (
        <>

            <h2>Bienvenue page des questions :p</h2>
            {questions.map((question) => {
                <div key={question.id}>
                    <p>{question.question} </p>
                    <p>{question.contenu}</p>
                </div>;
            })}
        </>
    );
};

export default Questions;