export type ScoresboardResponseWP = {
    utilisateur: number,
    quiz: number,
    points: number,
    temps: number,
    ID: number,
    post_title?: string;
    post_author?: string;
    post_date?: string;
    post_status?: string;

    [key: string]: any;
};
