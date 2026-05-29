import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        "border border-amber-200/80 bg-white text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
}
