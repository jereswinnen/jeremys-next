import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import EntryList from "@/components/blog/EntryList";

export const metadata: Metadata = {
  title: "Blog - Jeremy Swinnen",
};

export default async function Blog() {
  const posts = await getAllPosts();
  console.log("Rendered posts:", posts);

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[15vh] content-end">
        <header className="col-span-full md:!col-span-7">
          <h2 className="text-[clamp(40px,6vw,100px)] -tracking-[0.045em] leading-[1.12em] text-balance">
            Blog
          </h2>
        </header>
      </section>
      <section className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <EntryList posts={posts} />
        )}
      </section>
    </>
  );
}
