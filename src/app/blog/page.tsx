import { getAllPosts } from "@/utils/mdx";
import EntryList from "@/components/blog/EntryList";

export default async function Blog() {
  const posts = await getAllPosts();
  console.log("Rendered posts:", posts);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? <p>No posts found</p> : <EntryList posts={posts} />}
    </div>
  );
}
