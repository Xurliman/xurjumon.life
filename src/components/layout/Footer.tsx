"use client";

import { Container } from "./Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useTranslation } from "@/hooks/useTranslation";
import type { AboutDict, UiDict } from "@/types";

export function Footer() {
  const about = useTranslation<AboutDict>("about");
  const ui = useTranslation<UiDict>("ui");

  return (
    <footer className="relative border-t border-amber-200/60 bg-white/50 dark:border-gray-800/50 dark:bg-transparent">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} {about?.firstName ?? ""}{" "}
          {about?.lastName ?? ""}. {ui?.footer.rights ?? ""}
        </p>
        <SocialLinks iconSize={16} />
      </Container>
    </footer>
  );
}
