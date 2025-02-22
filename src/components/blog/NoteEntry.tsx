import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Note } from "@/lib/entryTypes";

interface NoteEntryProps {
  post: Note;
  isFeatured?: boolean;
}

export default function NoteEntry({
  post,
  isFeatured = false,
}: NoteEntryProps) {
  return (
    <>
      <section className="flex">
        <Link
          href={`/blog/notes/${post.slug}`}
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
      <section className="flex flex-col gap-4">
        {post.title && (
          <header>
            <h3>
              <Link
                href={`/blog/notes/${post.slug}`}
                className={`${
                  isFeatured ? "text-xl" : "text-base"
                } font-semibold hover:underline`}
              >
                {post.title}
              </Link>
            </h3>
          </header>
        )}
        {isFeatured && post.image && (
          <div className="w-full">
            <Image
              src={post.image}
              alt={post.title || "Note image"}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full"
            />
          </div>
        )}
        <div className={`text-balance ${isFeatured ? "text-lg" : ""}`}>
          {post.body}
        </div>
      </section>
    </>
  );
}
