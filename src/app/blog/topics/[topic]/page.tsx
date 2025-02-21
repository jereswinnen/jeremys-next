import type { Metadata } from "next";
import { getPostsByTopic } from "@/lib/blog";
import EntryList from "@/components/blog/EntryList";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    topic: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const topic = decodeURIComponent(params.topic);
  return {
    title: `${topic} - Topics - Jeremy Swinnen`,
  };
}

export default async function Topic({ params }: PageProps) {
  const topic = decodeURIComponent(params.topic);
  const posts = await getPostsByTopic(topic);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <>
      <section className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12 min-h-[15vh] content-end">
        <header className="col-span-full md:!col-span-7">
          <h2 className="text-[clamp(40px,6vw,100px)] -tracking-[0.045em] leading-[1.12em] text-balance">
            {topic}
          </h2>
        </header>
        <div className="col-span-full flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6">
          <Link
            href="/blog/topics"
            className="text-sm opacity-70 hover:opacity-100"
          >
            ← Back to Topics
          </Link>
        </div>
      </section>
      <section className="col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20">
        <EntryList posts={posts} />
      </section>
    </>
  );
}
