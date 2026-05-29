"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/blogs": "Blog Posts",
  "/admin/projects": "Projects",
  "/admin/experience": "Experience",
};

export function AdminTopbar() {
  const pathname = usePathname();

  let title = "Admin";
  for (const [path, label] of Object.entries(pageTitles)) {
    if (pathname === path || pathname.startsWith(path + "/")) {
      title = label;
      break;
    }
  }

  if (pathname.includes("/new")) {
    title = "Create New";
  } else if (pathname.match(/\/[a-zA-Z0-9-]+$/) && !pageTitles[pathname]) {
    title = "Edit";
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <ThemeToggle />
    </header>
  );
}
