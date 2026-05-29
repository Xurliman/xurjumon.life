"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Flag } from "./Flag";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function LanguageSelect() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-800 dark:text-gray-400 dark:hover:bg-green-950/50 dark:hover:text-amber-300"
      >
        <Flag locale={locale} size={20} />
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-amber-200/60 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          {locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(l)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-amber-50 text-amber-800 dark:bg-green-950/50 dark:text-amber-300"
                      : "text-gray-700 hover:bg-amber-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <Flag locale={l} size={18} />
                  <span className="flex-1 text-left">{localeNames[l]}</span>
                  {active && <Check size={14} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
