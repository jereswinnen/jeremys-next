interface LinkSummaryProps {
  title: string;
  url: string;
}

export function LinkSummary({ title, url }: LinkSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80"
      >
        <h2 className="text-xl font-semibold text-blue-500 hover:underline">
          {title}
        </h2>
        <p className="text-gray-600 mt-2 text-sm truncate">{url}</p>
      </a>
    </div>
  );
}
