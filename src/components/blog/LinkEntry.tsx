import React from "react";
import { Link } from "next-view-transitions";
import { Link as LinkType } from "@/lib/entryTypes";
import Image from "next/image";
import { compileMdx } from "@/lib/compileMdx";

interface LinkEntryProps {
  post: LinkType;
  isFeatured?: boolean;
}

export default async function LinkEntry({
  post,
  isFeatured = false,
}: LinkEntryProps) {
  const compiledNote = post.note ? await compileMdx(post.note) : null;

  if (isFeatured) {
    return (
      <>
        <div className="group relative flex flex-col">
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
              post.image ? "z-2 p-4 backdrop-blur-lg" : ""
            } flex flex-col gap-3`}
          >
            <a
              className="text-sm font-stretch-90% uppercase opacity-50 hover:opacity-100"
              href={`/blog/links/${post.slug}`}
            >
              <time dateTime={new Date(post.date).toISOString()}>
                {new Date(post.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </time>
            </a>
            <header className="w-fit">
              <a
                className="p-2 flex flex-col bg-stone-950/10 rounded-md hover:bg-stone-950/20"
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
            {compiledNote && (
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-[3px] h-full bg-stone-950/20 rounded-full"></span>
                <div className="text-balance">{compiledNote}</div>
              </div>
            )}
          </div>
        </div>
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
        <header className="w-fit">
          <a
            className="p-2 flex flex-col bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 rounded-md"
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
        {compiledNote && (
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-[3px] h-full bg-stone-950/20 rounded-full"></span>
            <div className="text-balance">{compiledNote}</div>
          </div>
        )}
      </section>
    </>
  );
}
