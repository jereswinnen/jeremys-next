import React from "react";
import { Link } from "next-view-transitions";
import { Link as LinkType } from "@/utils/entryTypes";

interface LinkEntryProps {
  post: LinkType;
}

export default function LinkEntry({ post }: LinkEntryProps) {
  return (
    <div className="p-4 border rounded-lg">
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold hover:underline"
      >
        {post.title}
      </a>
      <Link
        href={`/blog/links/${post.slug}`}
        className="ml-4 text-sm text-gray-500 hover:underline"
      >
        {new Date(post.date).toLocaleDateString()}
      </Link>
    </div>
  );
}
