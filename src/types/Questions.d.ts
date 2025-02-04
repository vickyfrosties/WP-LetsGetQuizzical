export type QuestionsResponseWP = Array<{
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    template: string;
    class_list: Array<string>;
    question: string;
    contenu: string;
    reponses_accepteees: string;
    association_avec_un_quiz: any;
    _links: {
        self: Array<{
            href: string;
            targetHints: {
                allow: Array<string>;
            };
        }>;
        collection: Array<{
            href: string;
        }>;
        about: Array<{
            href: string;
        }>;
        "wp:attachment": Array<{
            href: string;
        }>;
        curies: Array<{
            name: string;
            href: string;
            templated: boolean;
        }>;
    };
}>;
