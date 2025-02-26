import { ScoresboardResponseWP } from "../types";

const { VITE_URL_WP } = import.meta.env;

export async function postScore(finalScore: number | null, totalQuestions: number, percentage: string | null): Promise<ScoresboardResponseWP[]> {

  const scoreData = {
    title: `Score du ${new Date().toLocaleDateString("fr-FR")}`,
    fields: {
      score: finalScore,
      total: totalQuestions,
      percentage: percentage
    },
    status: "publish"
  };

  console.log(scoreData);

  const response = await fetch(VITE_URL_WP + "wp-json/wp/v2/scoresboard/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": (window as any).wpApiSettings.nonce,
    },
    credentials: "include",
    body: JSON.stringify(scoreData),
  });

  if (!response.ok) {
    throw new Error(`${response.status} : ${await response.text()}`);
  }

  return await response.json();
}
