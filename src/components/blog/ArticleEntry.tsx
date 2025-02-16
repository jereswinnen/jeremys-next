import React from "react";
import { Link } from "next-view-transitions";
import { Article } from "@/lib/entryTypes";

interface ArticleEntryProps {
  post: Article;
}

export default function ArticleEntry({ post }: ArticleEntryProps) {
  return (
    <div className="p-4 border rounded-lg">
      <Link
        href={`/blog/articles/${post.slug}`}
        className="text-xl font-semibold hover:underline block"
      >
        {post.title}
      </Link>
      <time className="text-sm text-gray-500 mt-1 block">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </div>
  );
}
