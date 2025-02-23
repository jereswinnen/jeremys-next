import Image from "next/image";

interface BookSummaryProps {
  cover: string;
  title: string;
  author: string;
  rating: number;
  url?: string;
}

export function BookSummary({
  cover,
  title,
  author,
  rating,
  url,
}: BookSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex gap-8">
        <Image
          src={cover}
          alt={title}
          width={120}
          height={180}
          className="object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{author}</p>
          <div className="mt-4">Rating: {rating}/5</div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 block"
            >
              View on Goodreads
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
