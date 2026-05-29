import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
}

export function BlogCard({ post }: { post: BlogCardPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-amber-100/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-200/30 dark:bg-gray-900 dark:ring-gray-800/50 dark:hover:shadow-green-900/10">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-amber-200 via-yellow-100 to-green-100 dark:from-amber-950/50 dark:via-yellow-950/30 dark:to-green-950/30">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-green-950/50 dark:text-amber-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-700 dark:text-gray-100 dark:group-hover:text-amber-400">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readingTime}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
