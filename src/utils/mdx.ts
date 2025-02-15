import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/utils/entryTypes";

// Helper to get the correct content directory
const getContentDirectory = () => {
  const currentDir = process.cwd();
  const contentDir = path.join(currentDir, "src", "content");
  return contentDir;
};

export async function getAllPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  const contentDir = getContentDirectory();

  // Read articles
  try {
    const articlesDir = path.join(contentDir, "articles");
    console.log("Reading articles from:", articlesDir);

    const files = fs.readdirSync(articlesDir);
    console.log("Found article files:", files);

    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

      const fullPath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      console.log("Article frontmatter:", data);

      const slug = file.replace(/\.mdx?$/, "");

      const post: Post = {
        slug,
        type: "article",
        title: data.title,
        date: data.date,
        body: content,
      };

      posts.push(post);
      console.log("Added article:", post);
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
      const { data, content } = matter(fileContents);

      const slug = file.replace(/\.mdx?$/, "");

      if (data.title && data.author && data.cover && data.rating) {
        const post: Post = {
          slug,
          type: "book",
          title: data.title,
          author: data.author,
          cover: data.cover,
          rating: data.rating,
          date: data.date,
          url: data.url,
          note: content,
        };
        posts.push(post);
      }
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
      const { data, content } = matter(fileContents);

      const slug = file.replace(/\.mdx?$/, "");

      if (data.title && data.url) {
        const post: Post = {
          slug,
          type: "link",
          title: data.title,
          url: data.url,
          date: data.date,
          note: content,
        };
        posts.push(post);
      }
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
      const { data, content } = matter(fileContents);

      const slug = file.replace(/\.mdx?$/, "");

      const post: Post = {
        slug,
        type: "note",
        title: data.title,
        date: data.date,
        body: content,
      };
      posts.push(post);
    }
  } catch (error) {
    console.error("Error reading notes:", error);
  }

  console.log("Total posts found:", posts.length);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  type: string,
  slug: string
): Promise<Post | null> {
  const contentDir = getContentDirectory();
  const fullPath = path.join(contentDir, `${type}s`, `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    switch (type) {
      case "article":
        return {
          slug,
          type: "article",
          title: data.title,
          date: data.date,
          body: content,
        };
      case "book":
        return {
          slug,
          type: "book",
          title: data.title,
          author: data.author,
          cover: data.cover,
          rating: data.rating,
          date: data.date,
          url: data.url,
          note: content,
        };
      case "link":
        return {
          slug,
          type: "link",
          title: data.title,
          url: data.url,
          date: data.date,
          note: content,
        };
      case "note":
        return {
          slug,
          type: "note",
          title: data.title,
          date: data.date,
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
