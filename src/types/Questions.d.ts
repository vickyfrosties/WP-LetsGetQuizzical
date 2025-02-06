export type QuestionsResponseWP = {
    id: number,
    question: string,
    contenu?: string,
    reponses_acceptees?: string,
    association_avec_un_quizz?: number[];

    ID: number,
    post_title?: string,
    post_mime_type: string,
    guid?: string,
    [key: string]: any;

};