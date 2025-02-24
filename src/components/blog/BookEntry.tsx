import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Book } from "@/lib/entryTypes";
import { compileMdx } from "@/lib/compileMdx";

interface BookEntryProps {
  post: Book;
  isFeatured?: boolean;
}

export default async function BookEntry({
  post,
}: //isFeatured = false,
BookEntryProps) {
  const compiledNote = post.note ? await compileMdx(post.note) : null;

  return (
    <>
      <Link
        href={`/blog/books/${post.slug}`}
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
        <header className="p-2 flex items-center gap-2 bg-stone-100 dark:bg-stone-900 rounded-md">
          <Image
            src={post.cover}
            alt={`${post.title} by ${post.author}`}
            width={100}
            height={100}
            className="relative w-8 h-auto rounded"
          />
          <div className="flex flex-1 flex-col">
            <h3 className="font-medium">{post.title}</h3>
            <em className="not-italic text-sm font-stretch-90% uppercase opacity-60">
              {post.author}
              {post.year && <> &mdash; {post.year}</>}
            </em>
          </div>
          {post.rating && (
            <div className="flex items-start gap-0.5 font-light text-3xl">
              {post.rating}
              <span className="font-normal text-sm opacity-60">/10</span>
            </div>
          )}
        </header>
        {compiledNote && <div className="text-balance">{compiledNote}</div>}
      </section>
    </>
  );
}
