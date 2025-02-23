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
  if (isFeatured) {
    return (
      <>
        <Link
          className="group relative flex flex-col"
          href={`/blog/notes/${post.slug}`}
        >
          {post.image && (
            <Image
              src={post.image}
              alt={post.title || "Note image"}
              width={1000}
              height={500}
              className="absolute w-full h-full object-cover"
            />
          )}
          <div
            className={`${
              post.image
                ? "z-2 p-4 backdrop-blur-lg transition-all duration-300 ease-circ bg-stone-950/0 group-hover:bg-stone-950/20"
                : ""
            } flex flex-col gap-3`}
          >
            <time
              className="text-sm font-stretch-90% uppercase opacity-50"
              dateTime={new Date(post.date).toISOString()}
            >
              {new Date(post.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </time>
            <div className="flex flex-col">
              {post.title && (
                <header>
                  <h3>
                    <Link
                      href={`/blog/notes/${post.slug}`}
                      className="text-base font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                </header>
              )}
              <div className="text-balance">{post.body}</div>
            </div>
          </div>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        className="text-sm font-stretch-90% uppercase opacity-50 hover:opacity-100"
        href={`/blog/notes/${post.slug}`}
      >
        <time dateTime={new Date(post.date).toISOString()}>
          {new Date(post.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </time>
      </Link>
      <section className="flex flex-col">
        {post.title && (
          <header>
            <h3>
              <Link
                href={`/blog/notes/${post.slug}`}
                className="text-base font-medium hover:underline"
              >
                {post.title}
              </Link>
            </h3>
          </header>
        )}
        <div className="text-balance">{post.body}</div>
      </section>
    </>
  );
}
