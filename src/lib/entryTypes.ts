export type BasePost = {
  slug: string;
  featured?: boolean;
  theme?: string;
  type: "article" | "book" | "link" | "note";
  date: string;
  topics?: string[];
};

export interface Article extends BasePost {
  type: "article";
  title: string;
  body: string;
  image?: string;
}

export interface Book extends BasePost {
  type: "book";
  title: string;
  author: string;
  year?: number;
  cover: string;
  rating: number;
  url?: string;
  note?: string;
}

export interface Link extends BasePost {
  type: "link";
  title: string;
  url: string;
  note?: string;
  image?: string;
}

export interface Note extends BasePost {
  type: "note";
  title?: string;
  body: string;
  image?: string;
}

export type Post = Article | Book | Link | Note;
