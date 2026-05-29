import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/Container";
import { getBlogPost, listBlogPosts } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Khurli Jumamuratova`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="py-16 md:py-20 lg:py-24">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {post.coverImage && (
          <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl bg-gradient-to-br from-amber-200 via-yellow-100 to-green-100 dark:from-amber-950/50 dark:via-yellow-950/30 dark:to-green-950/30">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-green-950/50 dark:text-amber-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-100">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={15} />
              {post.author}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {post.readingTime}
            </span>
          )}
        </div>

        <hr className="my-8 border-amber-200/60 dark:border-gray-800" />

        <div className="markdown-body text-base leading-relaxed text-gray-700 dark:text-gray-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}
