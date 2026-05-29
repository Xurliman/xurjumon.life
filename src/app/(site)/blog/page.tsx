import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/ui/BlogCard";
import { listBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Khurli Jumamuratova",
  description: "Thoughts, tutorials, and insights from my development journey.",
};

export default async function BlogPage() {
  const posts = await listBlogPosts();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Blog"
          subtitle="Thoughts, tutorials, and insights from my development journey."
        />
        {posts.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No posts yet — add a Markdown file under{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">
              public/docs/
            </code>
            .
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
