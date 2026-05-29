import { NextResponse } from "next/server";
import { defaultLocale, isLocale, isSection, type Locale } from "@/i18n/config";
import { getSection } from "@/i18n/server";
import { experienceMeta } from "@/data/experience";
import { projectsMeta } from "@/data/projects";

type Json = unknown;
type Dict = Record<string, Json>;

function asDict(value: Json): Dict {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : {};
}

function joinItems<TMeta extends { id: string }>(
  metas: TMeta[],
  items: Json
): Array<TMeta & Dict> {
  const map = asDict(items);
  return metas
    .filter((meta) => map[meta.id] !== undefined)
    .map((meta) => ({ ...asDict(map[meta.id]), ...meta }));
}

export async function GET(
  request: Request,
  context: { params: Promise<{ section: string }> }
) {
  const { section } = await context.params;
  if (!isSection(section)) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const raw = new URL(request.url).searchParams.get("lang");
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  const dict = asDict(await getSection(section, locale));

  if (section === "experience") {
    return NextResponse.json({
      heading: dict.heading,
      items: joinItems(experienceMeta, dict.items),
    });
  }
  if (section === "work") {
    return NextResponse.json({
      heading: dict.heading,
      subtitle: dict.subtitle,
      items: joinItems(projectsMeta, dict.items),
    });
  }
  return NextResponse.json(dict);
}
