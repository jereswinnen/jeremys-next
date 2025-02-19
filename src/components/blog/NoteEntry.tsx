import React from "react";
import { Link } from "next-view-transitions";
import { Note } from "@/lib/entryTypes";

interface NoteEntryProps {
  post: Note;
}

export default function NoteEntry({ post }: NoteEntryProps) {
  return (
    <>
      <section className="flex justify-end">
        <Link
          href={`/blog/notes/${post.slug}`}
          className="text-sm opacity-70 hover:opacity-100"
        >
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </Link>
      </section>
      {
        <section className="flex flex-col">
          {post.title && (
            <header>
              <h3>
                <Link
                  href={`/blog/notes/${post.slug}`}
                  className="text-base font-semibold hover:underline"
                >
                  {post.title}
                </Link>
              </h3>
            </header>
          )}
          <div className="text-balance">{post.body}</div>
        </section>
      }
    </>
  );
}
