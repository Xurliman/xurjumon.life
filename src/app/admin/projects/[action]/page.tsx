"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminProjectFormPage() {
  const params = useParams<{ action: string }>();
  const router = useRouter();
  const isNew = params.action === "new";

  const [form, setForm] = useState({
    title: "",
    role: "",
    description: "",
    imageUrl: "/images/projects/placeholder.jpg",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (!isNew) {
      const project = projects.find((p) => p.id === params.action);
      if (project) {
        setForm({
          title: project.title,
          role: project.role,
          description: project.description,
          imageUrl: project.imageUrl,
          techStack: project.techStack.join(", "),
          liveUrl: project.liveUrl ?? "",
          githubUrl: project.githubUrl ?? "",
        });
      }
    }
  }, [isNew, params.action]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(isNew ? "Project created (placeholder)" : "Project updated (placeholder)");
    router.push("/admin/projects");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            value={form.techStack}
            onChange={(e) => setForm((prev) => ({ ...prev, techStack: e.target.value }))}
            placeholder="React, TypeScript, Tailwind"
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Live URL
            </label>
            <input
              type="text"
              value={form.liveUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, liveUrl: e.target.value }))}
              placeholder="https://"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              GitHub URL
            </label>
            <input
              type="text"
              value={form.githubUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
              placeholder="https://github.com/"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
          >
            <Save size={16} />
            {isNew ? "Create Project" : "Save Changes"}
          </button>
          <Link
            href="/admin/projects"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
