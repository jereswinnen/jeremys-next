import type { Metadata } from "next";
import { getTopicsWithCounts } from "@/lib/blog";
import TopicList from "@/components/blog/TopicList";

export const metadata: Metadata = {
  title: "Topics - Jeremy Swinnen",
};

export default async function Topics() {
  const topics = await getTopicsWithCounts();

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[15vh] content-end">
        <header className="col-span-full md:!col-span-7">
          <h2 className="font-bold text-[clamp(40px,6vw,100px)] -tracking-[0.045em] leading-[1.12em] text-balance">
            Topics
          </h2>
        </header>
      </section>
      <TopicList topics={topics} />
    </>
  );
}
