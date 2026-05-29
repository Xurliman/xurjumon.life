import type { BlogPost, BlogPostMeta } from "@/types";

// Blog content now lives in public/docs/*.md and is read server-side via
// src/lib/blog.ts. These exports remain only to keep the admin pages
// compiling — they intentionally return empty arrays.
export const blogPostsMeta: BlogPostMeta[] = [];
export const blogPosts: BlogPost[] = [];
