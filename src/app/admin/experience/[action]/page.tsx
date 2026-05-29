"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { experience } from "@/data/experience";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

export default function AdminExperienceFormPage() {
  const params = useParams<{ action: string }>();
  const router = useRouter();
  const isNew = params.action === "new";

  const [form, setForm] = useState({
    company: "",
    role: "",
    dateRange: "",
    logoUrl: "",
    bullets: [""],
  });

  useEffect(() => {
    if (!isNew) {
      const entry = experience.find((e) => e.id === params.action);
      if (entry) {
        setForm({
          company: entry.company,
          role: entry.role,
          dateRange: entry.dateRange,
          logoUrl: entry.logoUrl ?? "",
          bullets: entry.bullets.length > 0 ? entry.bullets : [""],
        });
      }
    }
  }, [isNew, params.action]);

  function addBullet() {
    setForm((prev) => ({ ...prev, bullets: [...prev.bullets, ""] }));
  }

  function removeBullet(index: number) {
    setForm((prev) => ({
      ...prev,
      bullets: prev.bullets.filter((_, i) => i !== index),
    }));
  }

  function updateBullet(index: number, value: string) {
    setForm((prev) => ({
      ...prev,
      bullets: prev.bullets.map((b, i) => (i === index ? value : b)),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(isNew ? "Entry created (placeholder)" : "Entry updated (placeholder)");
    router.push("/admin/experience");
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-amber-500";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/admin/experience"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-amber-700 dark:text-gray-400 dark:hover:text-amber-400"
      >
        <ArrowLeft size={16} />
        Back to experience
      </Link>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
            required
            className={inputClass}
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
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Range
          </label>
          <input
            type="text"
            value={form.dateRange}
            onChange={(e) => setForm((prev) => ({ ...prev, dateRange: e.target.value }))}
            placeholder="Jan 2024 – Present"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Logo URL (optional)
          </label>
          <input
            type="text"
            value={form.logoUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, logoUrl: e.target.value }))}
            placeholder="/images/logos/company.png"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bullet Points
          </label>
          <div className="space-y-2">
            {form.bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateBullet(i, e.target.value)}
                  placeholder={`Bullet point ${i + 1}`}
                  className={inputClass}
                />
                {form.bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBullet(i)}
                    className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addBullet}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <Plus size={14} />
            Add bullet point
          </button>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:brightness-110"
          >
            <Save size={16} />
            {isNew ? "Create Entry" : "Save Changes"}
          </button>
          <Link
            href="/admin/experience"
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
