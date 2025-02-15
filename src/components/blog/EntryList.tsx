import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/utils/entryTypes";
import ArticleEntry from "@/components/blog/ArticleEntry";
import BookEntry from "@/components/blog/BookEntry";
import LinkEntry from "@/components/blog/LinkEntry";
import NoteEntry from "@/components/blog/NoteEntry";

interface EntryListProps {
  posts: Post[];
}

export default function EntryList({ posts }: EntryListProps) {
  console.log("PostList received posts:", posts);

  const groupedPosts = posts.reduce((groups, post) => {
    const date = format(new Date(post.date), "MMMM d, yyyy");
    console.log("Processing post:", post, "for date:", date);

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
    return groups;
  }, {} as Record<string, Post[]>);

  console.log("Grouped posts:", groupedPosts);

  return (
    <div className="space-y-8">
      {Object.entries(groupedPosts).map(([date, posts]) => (
        <div key={date} className="space-y-4">
          <h2 className="text-2xl font-bold">{date}</h2>
          <div className="space-y-4">
            {posts.map((post) => {
              console.log("Rendering post:", post);
              switch (post.type) {
                case "article":
                  return <ArticleEntry key={post.slug} post={post} />;
                case "book":
                  return <BookEntry key={post.slug} post={post} />;
                case "link":
                  return <LinkEntry key={post.slug} post={post} />;
                case "note":
                  return <NoteEntry key={post.slug} post={post} />;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
