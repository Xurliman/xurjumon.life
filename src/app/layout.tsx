import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import {
  defaultLocale,
  isLocale,
  sections,
  type Locale,
} from "@/i18n/config";
import { getSection } from "@/i18n/server";
import { experienceMeta } from "@/data/experience";
import { projectsMeta } from "@/data/projects";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteTitle = "Khurli Jumamuratova – Senior Backend Engineer (Go, Fintech)";
const siteDescription =
  "Senior backend engineer building core banking and lending systems in Go. 4+ years in fintech. Bologna, Italy – open to remote roles and contracts.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
  },
};

type Dict = Record<string, unknown>;

function asDict(value: unknown): Dict {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : {};
}

function joinItems<TMeta extends { id: string }>(
  metas: TMeta[],
  items: unknown
): Array<TMeta & Dict> {
  const map = asDict(items);
  return metas
    .filter((meta) => map[meta.id] !== undefined)
    .map((meta) => ({ ...asDict(map[meta.id]), ...meta }));
}

async function loadInitialStore(locale: Locale) {
  const entries = await Promise.all(
    sections.map(async (section) => {
      const dict = asDict(await getSection(section, locale));
      let payload: unknown = dict;
      if (section === "experience") {
        payload = {
          heading: dict.heading,
          items: joinItems(experienceMeta, dict.items),
        };
      } else if (section === "work") {
        payload = {
          heading: dict.heading,
          subtitle: dict.subtitle,
          items: joinItems(projectsMeta, dict.items),
        };
      }
      return [section, payload] as const;
    })
  );
  return Object.fromEntries(entries);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("portfolio.locale")?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const initialSections = await loadInitialStore(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-amber-50/30 text-gray-800 dark:bg-gray-950 dark:text-gray-100`}
      >
        <ThemeProvider>
          <LocaleProvider
            initialLocale={locale}
            initialStore={{ [locale]: initialSections }}
          >
            {children}
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
