import React from "react";
import { format } from "date-fns";
import { Post, Article, Book, Note, Link as LinkType } from "@/lib/entryTypes";
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
    <section className="col-span-full grid grid-cols-subgrid [&>*:not(:first-child)]:pt-8 [&>*:not(:last-child)]:pb-8 divide-y-2 divide-stone-950/15 dark:divide-white/15">
      {Object.entries(groupedPosts).map(([date, posts]) => (
        <section
          key={date}
          className="col-span-full md:!col-start-3 md:!col-span-3 flex flex-col gap-8"
        >
          <h2 className="text-2xl font-semibold">
            <time dateTime={new Date(date).toISOString()}>{date}</time>
          </h2>
          <div className="flex flex-col [&>*:not(:first-child)]:pt-5 [&>*:not(:last-child)]:pb-5 divide-y divide-stone-950/15 dark:divide-white/15">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="grid grid-cols-[1fr_6fr] gap-x-4"
              >
                {(() => {
                  switch (post.type) {
                    case "article":
                      return (
                        <ArticleEntry key={post.slug} post={post as Article} />
                      );
                    case "book":
                      return <BookEntry key={post.slug} post={post as Book} />;
                    case "link":
                      return (
                        <LinkEntry key={post.slug} post={post as LinkType} />
                      );
                    case "note":
                      return <NoteEntry key={post.slug} post={post as Note} />;
                    default:
                      return null;
                  }
                })()}
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
