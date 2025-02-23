import React from "react";
import { Link } from "next-view-transitions";
import { Link as LinkType } from "@/lib/entryTypes";
import Image from "next/image";

interface LinkEntryProps {
  post: LinkType;
  isFeatured?: boolean;
}

export default function LinkEntry({
  post,
  isFeatured = false,
}: LinkEntryProps) {
  if (isFeatured) {
    return (
      <>
        <Link
          className="group relative flex flex-col"
          href={`/blog/links/${post.slug}`}
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
                ? "z-2 p-4 text-white backdrop-blur-lg transition-all duration-300 ease-circ bg-stone-950/0 group-hover:bg-stone-950/20"
                : ""
            } flex flex-col gap-3`}
          >
            <time
              dateTime={new Date(post.date).toISOString()}
              className="text-sm font-stretch-90% uppercase opacity-50 hover:opacity-100"
            >
              {new Date(post.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </time>
            <section className="flex flex-col gap-3">
              <header className="w-fit p-2 bg-stone-950/10 rounded-md">
                <a
                  className="flex flex-col"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="font-medium">{post.title}</h3>
                  <em className="not-italic text-sm font-stretch-90% uppercase opacity-60">
                    {post.url}
                  </em>
                </a>
              </header>
              {post.note && (
                <div className="flex gap-3">
                  <span className="w-[3px] flex-shrink-0 h-full bg-stone-950/20 rounded-full"></span>
                  <div className="text-balance">{post.note}</div>
                </div>
              )}
            </section>
          </div>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/blog/links/${post.slug}`}
        className="text-sm font-stretch-90% uppercase opacity-50 hover:opacity-100"
      >
        <time dateTime={new Date(post.date).toISOString()}>
          {new Date(post.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </time>
      </Link>
      <section className="flex flex-col gap-3">
        <header className="w-fit p-2 bg-stone-100 dark:bg-stone-900 rounded-md">
          <a
            className="flex flex-col"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-medium">{post.title}</h3>
            <em className="not-italic text-sm font-stretch-90% uppercase opacity-60">
              {post.url}
            </em>
          </a>
        </header>
        {post.note && (
          <div className="flex gap-3">
            <span className="w-[3px] h-full bg-stone-950/20 rounded-full"></span>
            <div className="text-balance">{post.note}</div>
          </div>
        )}
      </section>
    </>
  );
}
