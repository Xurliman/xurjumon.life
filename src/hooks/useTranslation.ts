"use client";

import { useEffect } from "react";
import { useLocaleContext } from "@/providers/LocaleProvider";
import type { Section } from "@/i18n/config";

export function useTranslation<T>(section: Section): T | null {
  const { locale, store, ensureSection } = useLocaleContext();

  useEffect(() => {
    ensureSection(section);
  }, [section, locale, ensureSection]);

  return (store[locale]?.[section] as T) ?? null;
}

export function useLocale() {
  const { locale, setLocale } = useLocaleContext();
  return { locale, setLocale };
}
