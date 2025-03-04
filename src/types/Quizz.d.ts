import { QuestionsResponseWP } from "./Questions";
import { ScoresboardResponseWP } from "./Scoresboard";

export type ImageQuizzResponseWP = {
    ID: string,
    post_title?: string,
    post_mime_type: string,
    guid?: string,
    [key: string]: any;
};

export type QuizzesResponseWP = {
    id: number,
    date: string,
    date_gmt: string,
    slug?: string,
    status?: string,
    statut?: string,
    link?: string;
    title?: {
        rendered: string;
    };
    image?: ImageQuizzResponseWP[],
    description: string,
    difficulte: string,
    association_avec_les_questions?: QuestionsResponseWP[],
    scoreboard: ScoresboardResponseWP[],
    _links?: {
        self?: Array<{ href: string; }>;
        [key: string]: any;
    };
    [key: string]: any;

};

export type QuizCreationWP = {
    title: string,
    content: string,
};