"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  defaultLocale,
  isLocale,
  type Locale,
  type Section,
} from "@/i18n/config";

const STORAGE_KEY = "portfolio.locale";

type SectionCache = Partial<Record<Section, unknown>>;
type Store = Record<Locale, SectionCache>;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  store: Store;
  ensureSection: (section: Section) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

async function fetchSection(section: Section, locale: Locale): Promise<unknown> {
  const res = await fetch(`/api/${section}?lang=${locale}`);
  if (!res.ok) throw new Error(`Failed to load /api/${section}`);
  return res.json();
}

export function LocaleProvider({
  initialLocale = defaultLocale,
  initialStore = {},
  children,
}: {
  initialLocale?: Locale;
  initialStore?: Partial<Store>;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [store, setStore] = useState<Store>(() => ({
    en: {},
    uz: {},
    ru: {},
    kaa: {},
    ...initialStore,
  }));
  const [inflight] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved) && saved !== locale) setLocaleState(saved);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
        document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
      } catch {
        // ignore
      }
      router.refresh();
    },
    [router]
  );

  const ensureSection = useCallback(
    (section: Section) => {
      const key = `${locale}:${section}`;
      if (store[locale]?.[section] !== undefined) return;
      if (inflight.has(key)) return;
      inflight.add(key);
      fetchSection(section, locale)
        .then((data) => {
          setStore((prev) => ({
            ...prev,
            [locale]: { ...prev[locale], [section]: data },
          }));
        })
        .catch(() => {
          // swallow; consumer will keep rendering null and may retry on next change
        })
        .finally(() => {
          inflight.delete(key);
        });
    },
    [locale, store, inflight]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, store, ensureSection }),
    [locale, setLocale, store, ensureSection]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used inside <LocaleProvider>");
  }
  return ctx;
}
