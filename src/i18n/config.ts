export const locales = ["en", "uz", "ru", "kaa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  uz: "O'zbekcha",
  ru: "Русский",
  kaa: "Qaraqalpaqsha",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const sections = [
  "about",
  "experience",
  "work",
  "contact",
  "ui",
] as const;
export type Section = (typeof sections)[number];

export function isSection(value: string): value is Section {
  return (sections as readonly string[]).includes(value);
}