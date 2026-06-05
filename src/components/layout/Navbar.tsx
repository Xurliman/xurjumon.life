"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelect } from "@/components/ui/LanguageSelect";
import { navLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLocale, useTranslation } from "@/hooks/useTranslation";
import { getResumeDownloadName, getResumeUrl } from "@/lib/resume";
import type { AboutDict, UiDict } from "@/types";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const hashSectionIds = navLinks
  .filter((l) => l.href.startsWith("#"))
  .map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection(hashSectionIds);
  const ui = useTranslation<UiDict>("ui");
  const about = useTranslation<AboutDict>("about");
  const { locale } = useLocale();

  function isActive(link: { href: string }) {
    if (link.href.startsWith("#")) {
      return pathname === "/" && activeSection === link.href.replace("#", "");
    }
    return pathname.startsWith(link.href);
  }

  function resolveHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-200/60 bg-white/70 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="gradient-text text-lg font-bold">
            &lt;{about?.shortName ?? ""} /&gt;
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link)
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
                    : "text-gray-600 hover:bg-amber-50 hover:text-amber-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                )}
              >
                {ui?.nav[link.key] ?? ""}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getResumeUrl(locale)}
              download={getResumeDownloadName(locale)}
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-green-700 px-3.5 py-2 text-sm font-medium text-white shadow-md shadow-amber-500/25 transition-all hover:shadow-lg hover:shadow-amber-500/35 hover:brightness-110 sm:inline-flex"
            >
              <Download size={14} />
              {ui?.buttons.downloadCv ?? "Download CV"}
            </a>
            <LanguageSelect />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-800 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
              aria-label={ui?.buttons.toggleMenu ?? "Toggle menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  );
}
