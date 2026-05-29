import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
}

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string;
}

export interface BlogPostFull extends BlogPostSummary {
  content: string;
}

const DOCS_DIR = path.join(process.cwd(), "public", "docs");

async function readMarkdown(slug: string): Promise<BlogPostFull | null> {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Partial<BlogFrontmatter>;
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage ?? "",
      author: data.author ?? "",
      publishedAt: data.publishedAt ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: data.readingTime ?? "",
      content: parsed.content.trim(),
    };
  } catch {
    return null;
  }
}

export async function listBlogPosts(): Promise<BlogPostSummary[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(DOCS_DIR);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));

  const posts = await Promise.all(slugs.map((slug) => readMarkdown(slug)));
  return posts
    .filter((p): p is BlogPostFull => p !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(({ content: _content, ...summary }) => summary);
}

export async function getBlogPost(slug: string): Promise<BlogPostFull | null> {
  return readMarkdown(slug);
}
