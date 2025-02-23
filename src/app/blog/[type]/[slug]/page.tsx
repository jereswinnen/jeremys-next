import { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemeProvider from "@/hooks/ThemeProvider";
import { getPostBySlug } from "@/lib/blog";
import { compileMdx } from "@/lib/compileMdx";
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

  const content = "body" in post ? await compileMdx(post.body) : null;
  const note = "note" in post ? await compileMdx(post.note) : null;
  const mainContent = content || note;

  return (
    <ThemeProvider theme={post.theme}>
      <article className="col-span-full grid grid-cols-subgrid !gap-y-6 md:!gap-y-12">
        <header className="col-span-full min-h-[10vh] md:min-h-[30vh] content-center">
          <h1 className="font-bold text-[clamp(40px,6vw,100px)] font-stretch-90% leading-[1.12em] indnt-8 md:indnt-32 text-balance">
            {"title" in post ? post.title : `Note - ${post.date}`}
          </h1>
        </header>

        <div className="col-span-full md:!col-start-4 md:!col-span-3">
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

          {mainContent && (
            <div className="[&>figure]:py-6 [&>figure]:bg-blue-800 [&>figure]:flex [&>figure]:gap-2 [&>h2]:py-2 [&>h2]:font-semibold [&>h2]:text-2xl [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-sky-light">
              {mainContent}
            </div>
          )}
        </div>
      </article>
    </ThemeProvider>
  );
}
