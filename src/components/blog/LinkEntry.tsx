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
  return (
    <>
      <section className="flex">
        <Link
          href={`/blog/links/${post.slug}`}
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
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col px-2 py-1 ${
            isFeatured ? "bg-amber-300" : "bg-stone-100 dark:bg-stone-900"
          } rounded`}
        >
          <span className={`${isFeatured ? "text-xl" : ""} font-semibold`}>
            {post.title}
          </span>
          <span className="text-sm opacity-70">{post.url}</span>
        </a>
        {isFeatured && post.image && (
          <div className="w-full">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full"
            />
          </div>
        )}
        <div className="flex gap-3">
          <span className="w-[3px] h-full bg-stone-300 dark:bg-stone-700 rounded-full"></span>
          {post.note && (
            <div className={`text-balance ${isFeatured ? "text-lg" : ""}`}>
              {post.note}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
