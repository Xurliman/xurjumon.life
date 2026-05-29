"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { blogPosts as initialPosts } from "@/data/blogs";
import type { BlogPost } from "@/types";
import { Plus } from "lucide-react";

const columns = [
  {
    key: "title",
    label: "Title",
    render: (post: BlogPost) => (
      <span className="font-medium">{post.title}</span>
    ),
  },
  {
    key: "publishedAt",
    label: "Date",
    render: (post: BlogPost) =>
      new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  },
  {
    key: "tags",
    label: "Tags",
    render: (post: BlogPost) => (
      <div className="flex flex-wrap gap-1">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-green-950/50 dark:text-amber-300"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "readingTime",
    label: "Read Time",
  },
];

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  function handleDelete(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {posts.length} post{posts.length !== 1 && "s"}
        </p>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={posts}
        editBasePath="/admin/blogs"
        onDelete={handleDelete}
      />
    </div>
  );
}
