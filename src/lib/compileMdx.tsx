import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export const compileMdx = cache(async (content: string) => {
  if (!content) return null;

  const { content: compiledContent } = await compileMDX({
    source: content,
  });

  return compiledContent;
});

export async function remarkGfmConfig(source?: string) {
  if (!source) return null;

  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
