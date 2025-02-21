import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/lib/entryTypes";

// Helper to get the correct content directory
const getContentDirectory = () => {
  const currentDir = process.cwd();
  const contentDir = path.join(currentDir, "src", "content");
  return contentDir;
};

// Define a type for the base frontmatter properties
type BaseFrontmatter = {
  date: string;
  theme?: string;
  title?: string;
  author?: string;
  cover?: string;
  rating?: number;
  url?: string;
  topics?: string[];
  [key: string]: unknown;
};

// Helper to safely cast gray-matter data to BaseFrontmatter
const castToBaseFrontmatter = (
  data: Record<string, unknown>
): BaseFrontmatter => {
  // Ensure topics is properly handled
  const topics = Array.isArray(data.topics)
    ? data.topics
    : typeof data.topics === "string"
    ? [data.topics]
    : undefined;

  return {
    ...data,
    topics,
  } as BaseFrontmatter;
};

// Helper function to get base properties
const getBaseProps = (
  data: { date: string; theme?: string; topics?: string[] },
  slug: string
) => ({
  slug,
  date: data.date,
  theme: data.theme || "default",
  topics: Array.isArray(data.topics) ? data.topics : [],
});

export async function getAllPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  const contentDir = getContentDirectory();

  // Read articles
  try {
    const articlesDir = path.join(contentDir, "articles");
    const files = fs.readdirSync(articlesDir);

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

      const fullPath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: rawData, content } = matter(fileContents);
      const data = castToBaseFrontmatter(rawData);

      if (!validateArticle(data)) {
        console.warn(
          `Skipping article ${file}: missing required frontmatter properties`
        );
        continue;
      }

      const slug = file.replace(/\.mdx?$/, "");
      const baseProps = getBaseProps(data, slug);

      const post: Post = {
        ...baseProps,
        type: "article",
        title: data.title,
        body: content,
      };

      posts.push(post);
    }
  } catch (error) {
    console.error("Error reading articles:", error);
  }

  // Read books
  try {
    const booksDir = path.join(contentDir, "books");
    const files = fs.readdirSync(booksDir);

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

      const fullPath = path.join(booksDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: rawData, content } = matter(fileContents);
      const data = castToBaseFrontmatter(rawData);

      if (!validateBook(data)) {
        console.warn(
          `Skipping book ${file}: missing required frontmatter properties`
        );
        continue;
      }

      const slug = file.replace(/\.mdx?$/, "");
      const baseProps = getBaseProps(data, slug);

      const post: Post = {
        ...baseProps,
        type: "book",
        title: data.title,
        author: data.author,
        cover: data.cover,
        rating: data.rating,
        url: data.url,
        note: content,
      };
      posts.push(post);
    }
  } catch (error) {
    console.error("Error reading books:", error);
  }

  // Read links
  try {
    const linksDir = path.join(contentDir, "links");
    const files = fs.readdirSync(linksDir);

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

      const fullPath = path.join(linksDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: rawData, content } = matter(fileContents);
      const data = castToBaseFrontmatter(rawData);

      if (!validateLink(data)) {
        console.warn(
          `Skipping link ${file}: missing required frontmatter properties`
        );
        continue;
      }

      const slug = file.replace(/\.mdx?$/, "");
      const baseProps = getBaseProps(data, slug);

      const post: Post = {
        ...baseProps,
        type: "link",
        title: data.title,
        url: data.url,
        note: content,
      };
      posts.push(post);
    }
  } catch (error) {
    console.error("Error reading links:", error);
  }

  // Read notes
  try {
    const notesDir = path.join(contentDir, "notes");
    const files = fs.readdirSync(notesDir);

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

      const fullPath = path.join(notesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: rawData, content } = matter(fileContents);
      const data = castToBaseFrontmatter(rawData);

      if (!validateNote(data)) {
        console.warn(
          `Skipping note ${file}: missing required frontmatter properties`
        );
        continue;
      }

      const slug = file.replace(/\.mdx?$/, "");
      const baseProps = getBaseProps(data, slug);

      const post: Post = {
        ...baseProps,
        type: "note",
        title: data.title,
        body: content,
      };
      posts.push(post);
    }
  } catch (error) {
    console.error("Error reading notes:", error);
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  type: string,
  slug: string
): Promise<Post | null> {
  const contentDir = getContentDirectory();
  // const fullPath = path.join(contentDir, `${type}s`, `${slug}.mdx`);
  const extensions = [".mdx", ".md"];
  const fullPath = extensions
    .map((ext) => path.join(contentDir, `${type}s`, `${slug}${ext}`))
    .find(fs.existsSync);

  if (!fullPath) {
    throw new Error(`File not found: ${slug} in ${type}s directory`);
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Base properties that all post types share
    const baseProps = {
      slug,
      date: data.date,
      theme: data.theme,
      topics: data.topics || [], // Add topics to base properties
    };

    switch (type) {
      case "article":
        return {
          ...baseProps,
          type: "article",
          title: data.title,
          body: content,
        };
      case "book":
        return {
          ...baseProps,
          type: "book",
          title: data.title,
          author: data.author,
          cover: data.cover,
          rating: data.rating,
          url: data.url,
          note: content,
        };
      case "link":
        return {
          ...baseProps,
          type: "link",
          title: data.title,
          url: data.url,
          note: content,
        };
      case "note":
        return {
          ...baseProps,
          type: "note",
          title: data.title,
          body: content,
        };
      default:
        return null;
    }
  } catch (error) {
    console.error("Error reading post:", error);
    return null;
  }
}

// Get all unique topics from posts
export async function getAllTopics(): Promise<string[]> {
  const posts = await getAllPosts();
  const topics = new Set<string>();

  posts.forEach((post) => {
    if (post.topics) {
      post.topics.forEach((topic) => topics.add(topic));
    }
  });

  return Array.from(topics).sort();
}

// Get all posts for a specific topic
export async function getPostsByTopic(topic: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.topics?.includes(topic));
}

// Update validation functions to include topics
const validateArticle = (
  data: BaseFrontmatter
): data is BaseFrontmatter & {
  date: string;
  theme?: string;
  title: string;
  topics?: string[];
} => {
  return (
    typeof data.date === "string" &&
    (data.theme === undefined || typeof data.theme === "string") &&
    typeof data.title === "string" &&
    (data.topics === undefined || Array.isArray(data.topics))
  );
};

const validateBook = (
  data: BaseFrontmatter
): data is BaseFrontmatter & {
  date: string;
  theme?: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  url?: string;
  topics?: string[];
} => {
  return (
    typeof data.date === "string" &&
    (data.theme === undefined || typeof data.theme === "string") &&
    typeof data.title === "string" &&
    typeof data.author === "string" &&
    typeof data.cover === "string" &&
    typeof data.rating === "number" &&
    (data.url === undefined || typeof data.url === "string") &&
    (data.topics === undefined || Array.isArray(data.topics))
  );
};

const validateLink = (
  data: BaseFrontmatter
): data is BaseFrontmatter & {
  date: string;
  theme?: string;
  title: string;
  url: string;
  topics?: string[];
} => {
  return (
    typeof data.date === "string" &&
    (data.theme === undefined || typeof data.theme === "string") &&
    typeof data.title === "string" &&
    typeof data.url === "string" &&
    (data.topics === undefined || Array.isArray(data.topics))
  );
};

const validateNote = (
  data: BaseFrontmatter
): data is BaseFrontmatter & {
  date: string;
  theme?: string;
  title: string;
  topics?: string[];
} => {
  return (
    typeof data.date === "string" &&
    (data.theme === undefined || typeof data.theme === "string") &&
    typeof data.title === "string" &&
    (data.topics === undefined || Array.isArray(data.topics))
  );
};

// Get all topics with their post counts
export async function getTopicsWithCounts(): Promise<
  Array<{ topic: string; count: number }>
> {
  const posts = await getAllPosts();
  const topicCounts = new Map<string, number>();

  posts.forEach((post) => {
    if (post.topics) {
      post.topics.forEach((topic) => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
      });
    }
  });

  return Array.from(topicCounts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}
