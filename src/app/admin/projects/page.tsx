"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { projects as initialProjects } from "@/data/projects";
import type { Project } from "@/types";
import { Plus } from "lucide-react";

const columns = [
  {
    key: "title",
    label: "Title",
    render: (p: Project) => <span className="font-medium">{p.title}</span>,
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "techStack",
    label: "Tech Stack",
    render: (p: Project) => (
      <div className="flex flex-wrap gap-1">
        {p.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-green-950/50 dark:text-amber-300"
          >
            {tech}
          </span>
        ))}
        {p.techStack.length > 3 && (
          <span className="text-xs text-gray-400">
            +{p.techStack.length - 3}
          </span>
        )}
      </div>
    ),
  },
];

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>(initialProjects);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {items.length} project{items.length !== 1 && "s"}
        </p>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={items}
        editBasePath="/admin/projects"
        onDelete={handleDelete}
      />
    </div>
  );
}
