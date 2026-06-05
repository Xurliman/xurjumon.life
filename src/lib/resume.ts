import type { Locale } from "@/i18n/config";

export function getResumeUrl(locale: Locale): string {
  return `/resume-${locale}.pdf`;
}

export function getResumeDownloadName(locale: Locale): string {
  return `Khurli-Jumamuratova-CV-${locale.toUpperCase()}.pdf`;
}
