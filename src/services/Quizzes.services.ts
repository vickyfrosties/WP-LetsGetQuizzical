import { QuizzesResponseWP } from "../types";

const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizzes(): Promise<QuizzesResponseWP[]> {
    const response = await fetch(VITE_URL_WP + `wp-json/wp/v2/quizzes`);

    const result: QuizzesResponseWP[] = await response.json();

    return result;
}

// aller chercher un élément sur base d'un ID
export async function getQuizById(id: number): Promise<QuizzesResponseWP> {
    const response = await fetch(VITE_URL_WP + `quiz/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();

    // vérifier si on a un scoreboard, si oui alors on récupère l'utilisateur directement depuis ce scoreboard.
    if (data.scoreboard && Array.isArray(data.scoreboard)) {
        // pour récupérer le scoreboard
        const scoreboardPromises = data.scoreboard.map(async (sbItem: any) => {

            if (sbItem.id) {
                const response = await fetch(`${VITE_URL_WP}scoreboard/${sbItem.id}`);

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