import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function getContentPaths(contentType: string) {
  const contentDir = path.join(process.cwd(), "src/content", contentType);
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function generateSitemapXML(sitemap: MetadataRoute.Sitemap): string {
  const entries = sitemap
    .map(
      (entry) => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified
      }</lastmod>
      ${
        entry.changeFrequency
          ? `<changefreq>${entry.changeFrequency}</changefreq>`
          : ""
      }
      ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
    </url>
  `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries}
    </urlset>`;
}

export async function GET(): Promise<Response> {
  const sitemap = generateSitemap();
  const xml = generateSitemapXML(sitemap);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function generateSitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jeremys.be";

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/info`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ] as MetadataRoute.Sitemap;

  // Content type mappings
  const contentTypes = ["articles", "books", "notes", "links", "work"];

  // Add dynamic routes for each content type
  contentTypes.forEach((type) => {
    const paths = getContentPaths(type);
    paths.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/blog/${type}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return routes;
}
