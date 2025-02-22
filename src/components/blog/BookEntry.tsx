import React from "react";
import Image from "next/image";
import { Book } from "@/lib/entryTypes";
import { Link } from "next-view-transitions";

interface BookEntryProps {
  post: Book;
  isFeatured?: boolean;
}

export default function BookEntry({
  post,
  isFeatured = false,
}: BookEntryProps) {
  return (
    <>
      <section className="flex">
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
            href={`/blog/books/${post.slug}`}
            className={`flex gap-2 px-2 py-1 ${
              isFeatured ? "bg-amber-300" : "bg-stone-100 dark:bg-stone-900"
            } rounded`}
          >
            <Image
              src={post.cover}
              alt={`${post.title} by ${post.author}`}
              width={isFeatured ? 120 : 80}
              height={isFeatured ? 180 : 120}
              className="relative w-auto h-24 rounded"
            />
            <div className="flex flex-col">
              <span className={`${isFeatured ? "text-xl" : ""} font-semibold`}>
                {post.title}
              </span>
              <span
                className={`${isFeatured ? "text-lg" : "text-sm"} opacity-70`}
              >
                {post.author}
              </span>
              {post.rating && (
                <div
                  className={`${
                    isFeatured ? "text-base" : "text-sm"
                  } opacity-70`}
                >
                  Rating: {post.rating}/5
                </div>
              )}
            </div>
          </Link>
        </header>
        {post.note && (
          <div className={`text-balance ${isFeatured ? "text-lg" : ""}`}>
            {post.note}
          </div>
        )}
      </section>
    </>
  );
}
