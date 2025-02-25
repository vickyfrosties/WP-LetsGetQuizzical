// import { ScoresboardResponseWP } from "../types";

// const { VITE_URL_WP } = import.meta.env;


// export async function postScore(finalScore: number | null, totalQuestions: number, percentage: string | null): Promise<ScoresboardResponseWP[]> {
// const response = await fetch(VITE_URL_WP + "wp-json/wp/v2/scoresboard/");

// if (!response.ok) {
//   throw new Error(`${response.status}`);
// }

// const scoreData = {
//   title: `Score du ${new Date().toLocaleDateString()}`,
//   fields: {
//     score: finalScore,
//     total: totalQuestions,
//     percentage: percentage
//   },
//   status: "publish"
// };

// await fetch(VITE_URL_WP + "wp-json/wp/v2/scoresboard/", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(scoreData),
// });

// const data = await response.json();

// return data;
// }
