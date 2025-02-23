import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

export const compileMdx = cache(async (content: string) => {
  if (!content) return null;

  const { content: compiledContent } = await compileMDX({
    source: content,
  });

  return compiledContent;
});
