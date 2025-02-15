// src/app/blog/[type]/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/utils/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";

interface PageProps {
  params: {
    type: string;
    slug: string;
  };
}

export default async function Entry({ params }: PageProps) {
  // Remove the 's' from the type if it exists (e.g., "articles" -> "article")
  const type = params.type.replace(/s$/, "");
  const post = await getPostBySlug(type, params.slug);

  if (!post) {
    notFound();
  }

  // Compile MDX content
  let content;
  if ("body" in post) {
    const { content: compiledContent } = await compileMDX({
      source: post.body || "",
    });
    content = compiledContent;
  }

  let note;
  if ("note" in post && post.note) {
    const { content: compiledNote } = await compileMDX({
      source: post.note,
    });
    note = compiledNote;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {post.type === "article" && (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="prose max-w-none">{content}</div>
        </>
      )}

      {post.type === "book" && (
        <>
          <div className="flex gap-8 mb-8">
            <Image
              src={post.cover}
              alt={post.title}
              width={200}
              height={300}
              className="object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <p className="text-xl text-gray-600 mt-2">{post.author}</p>
              <div className="mt-4">Rating: {post.rating}/5</div>
              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  View on Goodreads
                </a>
              )}
            </div>
          </div>
          {note && <div className="prose max-w-none">{note}</div>}
        </>
      )}

      {post.type === "link" && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {post.title}
            </a>
          </h1>
          {note && <div className="prose max-w-none mt-8">{note}</div>}
        </>
      )}

      {post.type === "note" && (
        <>
          {post.title && (
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          )}
          <div className="prose max-w-none">{content}</div>
        </>
      )}
    </div>
  );
}
