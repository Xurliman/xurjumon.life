import type { ExperienceEntry, ExperienceMeta } from "@/types";
import en from "@/i18n/dictionaries/en/experience.json";

export const experienceMeta: ExperienceMeta[] = [
  { id: "1" },
  { id: "2" },
];

const items = (en as { items: Record<string, Omit<ExperienceEntry, "id" | "logoUrl">> }).items;

export const experience: ExperienceEntry[] = experienceMeta.map((meta) => ({
  ...items[meta.id],
  ...meta,
}));
