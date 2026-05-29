import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { defaultLocale, type Locale, type Section } from "./config";

const DICT_ROOT = path.join(process.cwd(), "src", "i18n", "dictionaries");

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

async function readJson(locale: Locale, section: Section): Promise<Json> {
  const file = path.join(DICT_ROOT, locale, `${section}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Json;
  } catch {
    return {};
  }
}

function isPlainObject(value: Json): value is { [k: string]: Json } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function deepMerge(base: Json, override: Json): Json {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined || override === null || override === ""
      ? base
      : override;
  }
  const out: { [k: string]: Json } = { ...base };
  for (const key of Object.keys(override)) {
    const o = override[key];
    if (o === undefined || o === null || o === "") continue;
    out[key] = key in base ? deepMerge(base[key], o) : o;
  }
  return out;
}

export async function getSection(
  section: Section,
  locale: Locale
): Promise<Json> {
  const en = await readJson(defaultLocale, section);
  if (locale === defaultLocale) return en;
  const requested = await readJson(locale, section);
  return deepMerge(en, requested);
}
