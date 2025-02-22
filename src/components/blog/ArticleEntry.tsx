import React from "react";
import { Link } from "next-view-transitions";
import { Article } from "@/lib/entryTypes";
import Image from "next/image";

interface ArticleEntryProps {
  post: Article;
  isFeatured?: boolean;
}

export default function ArticleEntry({
  post,
  isFeatured = false,
}: ArticleEntryProps) {
  return (
    <>
      <section className="flex">
        <time
          dateTime={new Date(post.date).toISOString()}
          className="text-sm opacity-70"
        >
          {new Date(post.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </time>
      </section>
      <section className="flex flex-col gap-4">
        <h3
          className={`${
            isFeatured ? "text-xl" : "text-lg"
          } font-medium hover:underline`}
        >
          <Link href={`/blog/articles/${post.slug}`}>{post.title}</Link>
        </h3>
        {isFeatured && post.image && (
          <div className="w-full">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="relative rounded-lg object-cover w-full"
            />
          </div>
        )}
      </section>
    </>
  );
}
