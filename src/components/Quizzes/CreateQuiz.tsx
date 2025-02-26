import { useState } from "react";
import { createQuiz } from "../../services/Quizzes.services";
import styles from "./Quizzes.module.css";

const CreateQuiz = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState("");
  const [reponses, setReponses] = useState("");
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
      <section className={styles.create_container}>

        <div className={styles.form_container}>
          <h2>Créer un quiz</h2>
          <p className={styles.message}> {message} </p>
          <form className={styles.form_quiz} onSubmit={handleSubmit}>
            <label htmlFor="title">Titre</label>
            <input
              autoFocus
              id="titre"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="contenu">Contenu</label>
            <textarea
              id="contenu"
              value={content}
              maxLength={500}
              onChange={(e) => setContent(e.target.value)}
            />

            <label htmlFor="question">Question</label>
            <input
              id="question"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />

            <label htmlFor="title">Réponse(s)</label>
            <input
              id="reponses"
              value={reponses}
              onChange={(e) => setReponses(e.target.value)}
            />

            <button type="submit">
              Créer le quiz
            </button>
          </form>
        </div>
      </section>

    </>
  );
};

export default CreateQuiz;