export type BasePost = {
  slug: string;
  date: string;
  type: "article" | "book" | "link" | "note";
  theme?: string;
};

export interface Article extends BasePost {
  type: "article";
  title: string;
  body: string;
}

export interface Book extends BasePost {
  type: "book";
  title: string;
  author: string;
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
}

export interface Note extends BasePost {
  type: "note";
  title?: string;
  body: string;
}

export type Post = Article | Book | Link | Note;
