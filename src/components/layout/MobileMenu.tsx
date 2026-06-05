"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { Download } from "lucide-react";
import { useLocale, useTranslation } from "@/hooks/useTranslation";
import { getResumeDownloadName, getResumeUrl } from "@/lib/resume";
import type { UiDict } from "@/types";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const ui = useTranslation<UiDict>("ui");
  const { locale } = useLocale();

  function resolveHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-amber-200/50 md:hidden dark:border-gray-800/50"
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={onClose}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-amber-50 hover:text-amber-800 dark:text-gray-400 dark:hover:bg-green-950/30 dark:hover:text-amber-300"
              >
                {ui?.nav[link.key] ?? ""}
              </Link>
            ))}
            <a
              href={getResumeUrl(locale)}
              download={getResumeDownloadName(locale)}
              onClick={onClose}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-3 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
            >
              <Download size={14} />
              {ui?.buttons.downloadCv ?? "Download CV"}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
