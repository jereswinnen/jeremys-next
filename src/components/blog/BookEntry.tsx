import React from "react";
import Image from "next/image";
import { Book } from "@/lib/entryTypes";
import { Link } from "next-view-transitions";

interface BookEntryProps {
  post: Book;
}

export default function BookEntry({ post }: BookEntryProps) {
  return (
    <div className="p-4 border rounded-lg flex gap-4">
      <Image
        src={post.cover}
        alt={post.title}
        width={80}
        height={120}
        className="object-cover"
      />
      <div>
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-gray-600">{post.author}</p>
        <time className="text-sm text-gray-500 block mt-1">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="mt-2">
          Rating: {post.rating}/5
          <Link
            href={`/blog/books/${post.slug}`}
            className="ml-4 text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
