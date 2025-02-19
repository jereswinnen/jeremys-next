import React from "react";
import { Link } from "next-view-transitions";
import { Link as LinkType } from "@/lib/entryTypes";

interface LinkEntryProps {
  post: LinkType;
}

export default function LinkEntry({ post }: LinkEntryProps) {
  return (
    <>
      <section className="flex justify-end">
        <Link
          href={`/blog/links/${post.slug}`}
          className="text-sm opacity-70 hover:opacity-100"
        >
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </Link>
      </section>
      <section className="flex flex-col gap-3">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col px-2 py-1 bg-stone-100 dark:bg-stone-900 rounded"
        >
          <span className="font-semibold">{post.title}</span>
          <span className="text-sm opacity-70">{post.url}</span>
        </a>
        <div className="flex gap-3">
          <span className="w-[3px] h-full bg-stone-300 dark:bg-stone-700 rounded-full"></span>
          {post.note && <div className="text-balance">{post.note}</div>}
        </div>
      </section>
    </>
  );
}
