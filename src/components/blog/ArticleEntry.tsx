import React from "react";
import { Link } from "next-view-transitions";
import { Article } from "@/lib/entryTypes";

interface ArticleEntryProps {
  post: Article;
}

export default function ArticleEntry({ post }: ArticleEntryProps) {
  return (
    <>
      <section className="flex justify-end">
        <time
          dateTime={new Date(post.date).toISOString()}
          className="text-sm opacity-70"
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </section>
      <section className="flex flex-col">
        <h3 className="text-lg font-medium hover:underline">
          <Link href={`/blog/articles/${post.slug}`}>{post.title}</Link>
        </h3>
      </section>
    </>
  );
}
