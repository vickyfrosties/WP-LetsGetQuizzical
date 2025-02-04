export type QuizzesResponseWP = Array<{
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
  titre: string;
  image: {
    ID: string;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: string;
    guid: string;
    menu_order: string;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    pod_item_id: string;
  };
  description: string;
  difficulte: Array<string>;
  statut: Array<string>;
  association_avec_les_questions: Array<{
    question: string;
    contenu: string;
    reponses_accepteees: string;
    association_avec_un_quiz: number;
    ID: number;
    post_title: string;
    post_content: string;
    post_excerpt: string;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    comments: boolean;
    id: number;
  }>;
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
