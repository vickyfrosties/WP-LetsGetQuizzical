import { QuizzesResponseWP } from "../types";

const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizzes(): Promise<QuizzesResponseWP[]> {
    const response = await fetch(VITE_URL_WP + `wp-json/wp/v2/quizzes`);

    const result: QuizzesResponseWP[] = await response.json();

    return result;
}