import { QuizzesResponseWP } from "../types/Quizzes";

const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizzes(): Promise<QuizzesResponseWP[]> {
    const response = await fetch(VITE_URL_WP + `wp-json/v2/quizzes`);

    const result: QuizzesResponseWP[] = await response.json();

    return result;
}