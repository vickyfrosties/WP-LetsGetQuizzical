export type QuestionsResponseWP = {
    id: number,
    question: string,
    contenu: string,
    reponses_acceptees: string,
    association_avec_un_quizz?: number[];
};