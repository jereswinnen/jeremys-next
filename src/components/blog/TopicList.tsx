import Link from "next/link";

interface TopicListProps {
  topics: Array<{ topic: string; count: number }>;
  className?: string;
}

export default function TopicList({ topics, className = "" }: TopicListProps) {
  if (topics.length === 0) return null;

  return (
    <section className={`grid grid-cols-subgrid ${className}`}>
      <div className="col-span-full flex flex-wrap gap-4">
        {topics.map(({ topic, count }) => (
          <Link
            key={topic}
            href={`/blog/topics/${encodeURIComponent(topic)}`}
            className="h-fit px-3 py-1.5 bg-stone-100 dark:bg-amber-900 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            {topic} {count}
          </Link>
        ))}
      </div>
    </section>
  );
}
