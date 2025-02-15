import React from "react";
import { Link } from "next-view-transitions";
import { Note } from "@/utils/entryTypes";

interface NoteEntryProps {
  post: Note;
}

export default function NoteEntry({ post }: NoteEntryProps) {
  return (
    <div className="p-4 border rounded-lg">
      {post.title && <h3 className="font-semibold">{post.title}</h3>}
      <Link
        href={`/blog/notes/${post.slug}`}
        className="text-gray-500 hover:underline"
      >
        {new Date(post.date).toLocaleDateString()}
      </Link>
    </div>
  );
}
