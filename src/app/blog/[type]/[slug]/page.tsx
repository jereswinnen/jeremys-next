import { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemeProvider from "@/hooks/ThemeProvider";
import { getPostBySlug } from "@/lib/blog";
import { remarkGfmConfig } from "@/lib/compileMdx";
import { BookSummary } from "@/components/blog/BookSummary";
import { LinkSummary } from "@/components/blog/LinkSummary";

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

  const title =
    "title" in post
      ? `${post.title} - Jeremy Swinnen`
      : `Note - ${post.date} - Jeremy Swinnen`;

  return {
    title,
    openGraph: { title },
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

  // Compile MDX content based on post type
  const content = "body" in post ? await remarkGfmConfig(post.body) : null;
  const note = "note" in post ? await remarkGfmConfig(post.note) : null;

  // Determine which content to show (either content or note)
  const mainContent = content || note;

  return (
    <ThemeProvider theme={post.theme}>
      <article className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12">
        <header className="bg-lime-800 col-span-full min-h-[10vh] md:min-h-[30vh] content-center">
          <h1 className="font-bold text-[clamp(40px,6vw,100px)] font-stretch-90% leading-[1.12em] indnt-8 md:indnt-32 text-balance">
            {"title" in post ? post.title : `Note - ${post.date}`}
          </h1>
        </header>

        <div className="col-span-full md:!col-start-4 md:!col-span-3 bg-amber-800">
          {post.type === "book" && (
            <BookSummary
              cover={post.cover}
              title={post.title}
              author={post.author}
              rating={post.rating}
              url={post.url}
            />
          )}

          {post.type === "link" && (
            <LinkSummary title={post.title} url={post.url} />
          )}

          {mainContent && <div>{mainContent}</div>}
        </div>
      </article>
    </ThemeProvider>
  );
}
