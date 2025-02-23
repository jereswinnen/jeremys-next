import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts, getTopicsWithCounts } from "@/lib/blog";
import blogroll from "@/content/data/blogroll.json";
import EntryList from "@/components/blog/EntryList";
import TopicList from "@/components/blog/TopicList";

export const metadata: Metadata = {
  title: "Blog - Jeremy Swinnen",
};

function getLastName(fullName: string): string {
  const parts = fullName.split(" ");
  return parts[parts.length - 1].toLowerCase();
}

export default async function Blog() {
  const posts = await getAllPosts();
  const topics = await getTopicsWithCounts();

  const sortedBlogroll = [...blogroll].sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name))
  );

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[30vh] content-end pb-6 border-b border-stone-950 dark:border-white/20">
        <header className="col-span-full md:!col-span-7">
          <h2 className="font-bold text-[clamp(40px,6vw,100px)] font-stretch-90% leading-[1.12em] text-balance">
            Blog
          </h2>
        </header>
      </section>
      <section className="col-span-full grid grid-cols-subgrid">
        <section className="col-span-full md:!col-start-2 md:!col-span-4 grid grid-cols-subgrid gap-y-6 md:gap-y-0 t-6 bordr-t border-stone-950 dark:border-white/20">
          {posts.length === 0 ? (
            <p>No posts found</p>
          ) : (
            <Suspense fallback={<div>Loading posts...</div>}>
              <EntryList posts={posts} />
            </Suspense>
          )}
        </section>
        <aside className="col-span-full md:!col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium font-stretch-90% uppercase opacity-50">
              Stay updated
            </h3>
            <ul className="pl-3 flex flex-col gap-2 border-l border-stone-950/15 dark:border-white/15 [&>li]:text-sm [&>li]:ease-in-out [&>li]:transition-all [&>li]:duration-300 [&>li]:hover:opacity-60 [&>li]:hover:translate-x-1">
              <li>
                <a
                  href="https://jeremys.be/feed.xml"
                  target="_blank"
                  rel="noopener"
                >
                  RSS
                </a>
              </li>
              <li>
                <a
                  href="https://threads.net/@jereswinnen"
                  target="_blank"
                  rel="noopener"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href="https://mstdn.social/@jeremys"
                  target="_blank"
                  rel="noopener"
                >
                  Mastodon
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium font-stretch-90% uppercase opacity-50">
              Blogroll
            </h3>
            <ul className="pl-3 flex flex-col gap-2 border-l border-stone-950/15 dark:border-white/15">
              {sortedBlogroll.map((blog) => (
                <li
                  key={blog.url}
                  className="text-sm ease-in-out duration-300 transition-all hover:opacity-60 hover:translate-x-1"
                >
                  <Link href={blog.url} target="_blank" rel="noopener">
                    {blog.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <TopicList topics={topics} />
        </aside>
      </section>
    </>
  );
}
