import { Metadata } from "next";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import ThemeProvider from "@/hooks/ThemeProvider";

interface PageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;

  const sanitizedType = type.replace(/s$/, "");
  const post = await getPostBySlug(sanitizedType, slug);

  if (!post) {
    return {};
  }

  return {
    title:
      "title" in post
        ? `${post.title} - Jeremy Swinnen`
        : `Note - ${post.date} - Jeremy Swinnen`,
    openGraph: {
      title:
        "title" in post
          ? `${post.title} - Jeremy Swinnen`
          : `Note - ${post.date} - Jeremy Swinnen`,
    },
  };
}

export default async function Entry({ params }: PageProps) {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;
  const sanitizedType = type.replace(/s$/, "");
  const post = await getPostBySlug(sanitizedType, slug);

  if (!post) {
    notFound();
  }

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

  console.log("Post theme:", post.theme);

  return (
    <ThemeProvider theme={post.theme}>
      <div className="max-w-4xl mx-auto py-8">
        {post.type === "article" && (
          <>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            {post.image && (
              <div className="mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
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
            {post.image && (
              <div className="mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            {note && <div className="prose max-w-none mt-8">{note}</div>}
          </>
        )}

        {post.type === "note" && (
          <>
            {post.title && (
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            )}
            {post.image && (
              <div className="mb-8">
                <Image
                  src={post.image}
                  alt={post.title || "Note image"}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            <div className="prose max-w-none">{content}</div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
