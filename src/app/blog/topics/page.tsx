import type { Metadata } from "next";
import { getTopicsWithCounts } from "@/lib/blog";
import Link from "next/link";

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
      <section className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
        <div className="col-span-full md:!col-start-3 md:!col-span-3 flex flex-wrap gap-4">
          {topics.length === 0 ? (
            <p className="text-stone-600 dark:text-stone-400">
              No topics found
            </p>
          ) : (
            topics.map(({ topic, count }) => (
              <Link
                key={topic}
                href={`/blog/topics/${encodeURIComponent(topic)}`}
                className="group px-3 py-1.5 bg-stone-100 dark:bg-stone-900 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              >
                <span>{topic}</span>
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-stone-200 dark:bg-stone-800 group-hover:bg-stone-300 dark:group-hover:bg-stone-700 transition-colors">
                  {count}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}
