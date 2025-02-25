import { useState } from "react";
import { createQuiz } from "../../services/Quizzes.services";

const CreateQuiz = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const success = await createQuiz({ title, content });
      if (success) {
        setMessage("Quiz créé");
        setTitle("");
        setContent("");
      } else {
        setMessage("Erreur lors de la création du quiz");
      }

    } catch (err) {
      setMessage("Erreur survenue");
    }
  };

  return (
    <>
      <div>
        <h2>Créer un quiz</h2>
        <p> {message} </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titre :</label>
          <input
            id="titre"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="title">Contenu :</label>
          <textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            Créer le quiz
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateQuiz;