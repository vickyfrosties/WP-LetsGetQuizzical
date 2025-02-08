import { QuizzesResponseWP } from "../types";

const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizzes(): Promise<QuizzesResponseWP[]> {
    const response = await fetch(VITE_URL_WP + `wp-json/wp/v2/quizzes`);

    const result: QuizzesResponseWP[] = await response.json();

    return result;
}

export async function getQuizById(id: number): Promise<QuizzesResponseWP> => {
    const response = await fetch(VITE_URL_WP + `wp-json/v2/quiz/${id}`);

    if (!response.ok) {
        throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();

    // pour avoir le nom de l'utilisateur et pas seulement son id
    if (data.points && Array.isArray(data.points)) {
        const scoreboardPromises = data.points.map(async (sbItem: any))=> {
            if (sbItem.id) {
                const response = await fetch(VITE_URL_WP + `/scoreboard/${sbItem.id}`);
            }
        }
    }
}