import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();
  const siteURL = "https://jeremys.be";

  const feed = new Feed({
    title: "Jeremy Swinnen",
    description: "UX/UI Designer & Creative Developer",
    id: siteURL,
    link: siteURL,
    language: "en",
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: "Jeremy Swinnen",
      link: siteURL,
    },
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.type}s/${post.slug}`;

    let content = "";
    switch (post.type) {
      case "article":
        content = post.body;
        break;
      case "book":
        content = `
          <p>Book: ${post.title} by ${post.author}</p>
          <p>Rating: ${post.rating}/5</p>
          ${post.note ? `<p>Notes: ${post.note}</p>` : ""}
          ${
            post.url ? `<p>Link: <a href="${post.url}">${post.url}</a></p>` : ""
          }
        `;
        break;
      case "link":
        content = `
          <p><a href="${post.url}">${post.title}</a></p>
          ${post.note ? `<p>${post.note}</p>` : ""}
        `;
        break;
      case "note":
        content = post.body;
        if (post.title) {
          content = `<h1>${post.title}</h1>${content}`;
        }
        break;
    }

    feed.addItem({
      title: post.title || post.slug,
      id: url,
      link: url,
      content,
      date: new Date(post.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
