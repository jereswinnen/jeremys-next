import React from "react";
import Image from "next/image";
import { Book } from "@/lib/entryTypes";
import { Link } from "next-view-transitions";

interface BookEntryProps {
  post: Book;
}

export default function BookEntry({ post }: BookEntryProps) {
  return (
    <>
      <section className="flex justify-end">
        <Link
          href={`/blog/books/${post.slug}`}
          className="text-sm opacity-70 hover:opacity-100"
        >
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </time>
        </Link>
      </section>
      <section className="flex flex-col gap-3">
        <header>
          <Link
            href="/"
            className="flex gap-2 px-2 py-1 bg-stone-100 dark:bg-stone-900 rounded"
          >
            <Image
              src={post.cover}
              alt={`${post.title} by ${post.author}`}
              width={80}
              height={120}
              className="relative w-8 h-auto rounded"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{post.title}</span>
              <span className="text-sm opacity-70">{post.author}</span>
            </div>
            {post.rating && (
              <div className="text-sm opacity-70">Rating: {post.rating}</div>
            )}
          </Link>
        </header>
        {post.note && <div className="text-balance">{post.note}</div>}
      </section>
    </>
  );
}
