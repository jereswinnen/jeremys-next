import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeFigure from "rehype-figure";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

// Shared MDX configuration
const mdxConfig: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeFigure, { className: "c-figure" }]],
    format: "mdx",
  },
};

export const compileMdx = cache(async (source?: string) => {
  if (!source) return null;

  try {
    const { content } = await compileMDX({
      source,
      options: mdxConfig,
    });

    return content;
  } catch (error) {
    console.error("Error compiling MDX:", error);
    return null;
  }
});
