"use client";

import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export function CopyButton({
  text,
  label,
  icon,
}: {
  text: string;
  label: string;
  icon?: React.ReactNode;
}) {
  const { copy, isCopied } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className="group flex items-center gap-3 text-lg font-medium text-gray-900 transition-colors hover:text-amber-600 dark:text-gray-100 dark:hover:text-amber-400 md:text-2xl"
    >
      {icon}
      <span>{label}</span>
      <span className="text-gray-400 transition-all group-hover:text-amber-500 dark:text-gray-600">
        {isCopied ? (
          <Check size={20} className="text-emerald-500" />
        ) : (
          <Copy size={20} />
        )}
      </span>
    </button>
  );
}
