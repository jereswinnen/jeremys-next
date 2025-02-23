import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Article } from "@/lib/entryTypes";

interface ArticleEntryProps {
  post: Article;
  isFeatured?: boolean;
}

export default function ArticleEntry({
  post,
  isFeatured = false,
}: ArticleEntryProps) {
  if (isFeatured) {
    return (
      <>
        <time
          dateTime={new Date(post.date).toISOString()}
          className="text-sm font-stretch-90% uppercase opacity-50"
        >
          {new Date(post.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </time>
        <Link
          className="group relative flex flex-col"
          href={`/blog/articles/${post.slug}`}
        >
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={1000}
              height={500}
              className="absolute w-full h-full object-cover"
            />
          )}
          <div
            className={`${
              post.image
                ? "z-2 min-h-[10vw] p-4 text-white backdrop-blur-lg transition-all duration-300 ease-circ bg-stone-950/0 group-hover:bg-stone-950/20"
                : ""
            } flex flex-col justify-end gap-1`}
          >
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {post.topics?.map((topic, index) => (
                <li
                  key={index}
                  className="text-sm font-medium font-stretch-90% uppercase opacity-50"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <h3 className="font-normal text-xl text-center text-balance group-hover:underline">
              {post.title}
            </h3>
          </div>
        </Link>
      </>
    );
  }

  return (
    <>
      <time
        dateTime={new Date(post.date).toISOString()}
        className="text-sm font-stretch-90% uppercase opacity-50"
      >
        {new Date(post.date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </time>
      <h3 className="font-medium text-xl hover:underline">
        <Link href={`/blog/articles/${post.slug}`}>{post.title}</Link>
      </h3>
    </>
  );
}
