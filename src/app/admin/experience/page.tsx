"use client";

import { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { experience as initialExperience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";
import { Plus } from "lucide-react";

const columns = [
  {
    key: "company",
    label: "Company",
    render: (e: ExperienceEntry) => (
      <span className="font-medium">{e.company}</span>
    ),
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "dateRange",
    label: "Period",
  },
  {
    key: "bullets",
    label: "Items",
    render: (e: ExperienceEntry) => (
      <span className="text-gray-500">{e.bullets.length} bullet{e.bullets.length !== 1 && "s"}</span>
    ),
  },
];

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceEntry[]>(initialExperience);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {items.length} entr{items.length !== 1 ? "ies" : "y"}
        </p>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
        >
          <Plus size={16} />
          New Entry
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={items}
        editBasePath="/admin/experience"
        onDelete={handleDelete}
      />
    </div>
  );
}
