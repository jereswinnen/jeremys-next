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

  const renderPost = (post: Post, isFeatured: boolean = false) => {
    const commonProps = {
      post: post,
      isFeatured: isFeatured,
    };

    switch (post.type) {
      case "article":
        return (
          <ArticleEntry
            key={post.slug}
            {...commonProps}
            post={post as Article}
          />
        );
      case "book":
        return (
          <BookEntry key={post.slug} {...commonProps} post={post as Book} />
        );
      case "link":
        return (
          <LinkEntry key={post.slug} {...commonProps} post={post as LinkType} />
        );
      case "note":
        return (
          <NoteEntry key={post.slug} {...commonProps} post={post as Note} />
        );
      default:
        return null;
    }
  };

  return (
    <section className="col-span-full grid grid-cols-subgrid [&>*:not(:first-child)]:pt-8 [&>*:not(:last-child)]:pb-8 divide-y-2 divide-stone-950/15 dark:divide-white/15">
      {Object.entries(groupedPosts).map(([date, posts]) => {
        // Sort posts by date (newest first) and split into featured and non-featured
        const sortedPosts = [...posts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const featuredPosts = sortedPosts.filter((post) => post.featured);
        const regularPosts = sortedPosts.filter((post) => !post.featured);

        console.log(
          "Featured posts:",
          featuredPosts.map((p) => ({
            slug: p.slug,
            featured: p.featured,
            image: "image" in p ? p.image : undefined,
          }))
        );

        return (
          <section
            key={date}
            className="col-span-full grid grid-cols-[1fr_2fr] gap-8"
          >
            <div className="col-span-full md:!col-start-2">
              <h2 className="text-2xl">
                <time dateTime={new Date(date).toISOString()}>{date}</time>
              </h2>
            </div>
            <div className="col-span-full grid grid-cols-subgrid gap-6">
              {featuredPosts.length > 0 && (
                <div className="col-span-full md:!col-span-1 flex flex-col gap-5">
                  {featuredPosts.map((post) => (
                    <article key={post.slug} className="flex flex-col gap-4">
                      {renderPost(post, true)}
                    </article>
                  ))}
                </div>
              )}
              <div className="col-span-full md:!col-start-2 flex flex-col [&>*:not(:first-child)]:pt-5 [&>*:not(:last-child)]:pb-5 divide-y divide-stone-950/10 dark:divide-white/10">
                {regularPosts.map((post) => (
                  <article key={post.slug} className="flex flex-col gap-4">
                    {renderPost(post)}
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
