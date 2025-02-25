import { QuizzesResponseWP } from "../types";
import { QuizCreationWP } from "../types/Quizz";

const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizzes(): Promise<QuizzesResponseWP[]> {
    const response = await fetch(VITE_URL_WP + `wp-json/wp/v2/quizzes`);

    const result: QuizzesResponseWP[] = await response.json();

    return result;
}

// aller chercher un élément sur base d'un ID
export async function getQuizById(id: number): Promise<QuizzesResponseWP> {
    const response = await fetch(VITE_URL_WP + `wp-json/wp/v2/quizzes/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();

    // vérifier si on a un scoreboard, si oui alors on récupère l'utilisateur directement depuis ce scoreboard.
    if (data.scoreboard && Array.isArray(data.scoreboard)) {
        // pour récupérer le scoreboard
        const scoreboardPromises = data.scoreboard.map(async (sbItem: any) => {

            if (sbItem.id) {
                const response = await fetch(`${VITE_URL_WP}/wp-json/wp/v2/scoresboard/${sbItem.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                const sbData = await response.json();
                return {
                    // décomposer pour récupérer l'user
                    ...sbItem,
                    utilisateur: sbData.utilisateur
                };
            }
            return sbItem;
        });

        data.scoreboard = await Promise.all(scoreboardPromises);
    }
    return data as QuizzesResponseWP;
}

export async function createQuiz(quiz: QuizCreationWP): Promise<boolean> {
    try {
        // chercher le nonce
        const wpApiSettings = (window as any).wpApiSettings;
        const nonce = wpApiSettings?.nonce;

        if (!nonce) {
            console.error("Aucun nonce");
            return false;
        }

        const response = await fetch(VITE_URL_WP + "wp-json/wp/v2/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-WP-Nonce": nonce
            },
            body: JSON.stringify({
                title: quiz.title,
                content: quiz.content,
                status: "publish"
            }),
            //  cookies de session
            credentials: "include"
        });
        return response.ok;
    } catch (err) {
        console.error("Erreur lors de la création de quiz");
        return false;
    }
}