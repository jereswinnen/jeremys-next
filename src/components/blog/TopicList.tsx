import { Link } from "next-view-transitions";

interface TopicListProps {
  topics: Array<{ topic: string; count: number }>;
  className?: string;
}

export default function TopicList({ topics, className = "" }: TopicListProps) {
  if (topics.length === 0) return null;

  return (
    <section className={`grid grid-cols-subgrid ${className}`}>
      <div className="col-span-full flex flex-col gap-4">
        <h3 className="text-sm font-medium font-stretch-90% uppercase opacity-50">
          Browse by topic
        </h3>
        <ul className="pl-3 flex flex-col gap-3 border-l border-stone-950/15 dark:border-white/15">
          {topics.map(({ topic, count }) => (
            <li
              key={topic}
              className="flex items-start gap-0.5 text-lg font-medium ease-in-out duration-300 transition-all hover:opacity-60 hover:translate-x-1"
            >
              <Link href={`/blog/topics/${encodeURIComponent(topic)}`}>
                {topic}
              </Link>
              <span className="text-sm font-stretch-90% opacity-50">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
