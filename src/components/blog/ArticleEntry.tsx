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
        <Link href={`/blog/articles/${post.slug}`}>
          {post.image && (
            <figure className="group relative">
              <Image
                src={post.image}
                alt={post.title}
                width={1000}
                height={500}
                className="max-h-[10vw] object-cover"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end p-4 text-white backdrop-blur-lg transition-all duration-300 ease-circ bg-stone-950/0 group-hover:bg-stone-950/20">
                <div className="flex flex-col gap-1 justify-center">
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
              </figcaption>
            </figure>
          )}
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
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-xl hover:underline">
          <Link href={`/blog/articles/${post.slug}`}>{post.title}</Link>
        </h3>
      </section>
    </>
  );
}
