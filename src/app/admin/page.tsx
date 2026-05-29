import Link from "next/link";
import { StatsCard } from "@/components/admin/StatsCard";
import { blogPosts } from "@/data/blogs";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import {
  FileText,
  FolderKanban,
  Briefcase,
  Eye,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<FileText size={22} />}
          label="Blog Posts"
          value={blogPosts.length}
        />
        <StatsCard
          icon={<FolderKanban size={22} />}
          label="Projects"
          value={projects.length}
        />
        <StatsCard
          icon={<Briefcase size={22} />}
          label="Experience"
          value={experience.length}
        />
        <StatsCard
          icon={<Eye size={22} />}
          label="Total Views"
          value="1,234"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent blog posts */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Recent Blog Posts
            </h2>
            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {blogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href={`/admin/blogs/${post.id}`}
                  className="ml-3 shrink-0 text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
            Quick Actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "New Blog Post", href: "/admin/blog/new" },
              { label: "New Project", href: "/admin/projects/new" },
              { label: "New Experience", href: "/admin/experience/new" },
              { label: "View Site", href: "/" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-amber-800 dark:hover:bg-amber-950/30 dark:hover:text-amber-400"
              >
                <Plus size={16} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
