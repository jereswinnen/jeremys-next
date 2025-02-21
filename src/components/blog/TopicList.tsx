import Link from "next/link";

interface TopicListProps {
  topics: Array<{ topic: string; count: number }>;
  className?: string;
}

export default function TopicList({ topics, className = "" }: TopicListProps) {
  if (topics.length === 0) return null;

  return (
    <section
      className={`col-span-full grid grid-cols-subgrid gap-y-6 md:gap-y-0 pt-6 border-t border-stone-950 dark:border-white/20 ${className}`}
    >
      <div className="col-span-full md:!col-start-3 md:!col-span-3 flex flex-wrap gap-4">
        {topics.map(({ topic, count }) => (
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
        ))}
      </div>
    </section>
  );
}
