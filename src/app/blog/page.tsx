import type { Metadata } from "next";
import { getAllPosts, getTopicsWithCounts } from "@/lib/blog";
import EntryList from "@/components/blog/EntryList";
import TopicList from "@/components/blog/TopicList";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Blog - Jeremy Swinnen",
};

export default async function Blog() {
  const posts = await getAllPosts();
  const topics = await getTopicsWithCounts();

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[15vh] content-end">
        <header className="col-span-full md:!col-span-7">
          <h2 className="font-bold text-[clamp(40px,6vw,100px)] font-stretch-90% leading-[1.12em] text-balance">
            Blog
          </h2>
        </header>
        <div className="col-span-full flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6">
          <Button href="/blog/topics" label="Topics" />
          <Button href="https://jeremys.be/feed.xml" label="RSS" />
        </div>
      </section>
      <section className="col-span-full grid grid-cols-subgrid">
        <section className="col-span-full md:!col-start-2 md:!col-span-4 grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
          {posts.length === 0 ? (
            <p>No posts found</p>
          ) : (
            <EntryList posts={posts} />
          )}
        </section>
        <TopicList className="col-span-full md:!col-span-2" topics={topics} />
      </section>
    </>
  );
}
