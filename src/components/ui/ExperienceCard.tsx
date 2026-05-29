import Image from "next/image";
import type { ExperienceEntry } from "@/types";

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="relative border-l-2 border-amber-200 py-6 pl-8 dark:border-gray-800">
      {/* Gradient dot on timeline */}
      <div className="absolute -left-[9px] top-8 h-4 w-4 rounded-full bg-gradient-to-br from-amber-500 to-green-600 shadow-md shadow-amber-500/40" />
      <div className="rounded-xl bg-white/80 p-5 shadow-sm ring-1 ring-amber-100 dark:bg-gray-900/50 dark:ring-gray-800/50">
        <div className="flex items-start gap-4">
          {/* Company logo */}
          {entry.logoUrl && (
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-amber-100 dark:bg-gray-800 dark:ring-gray-700">
              {/*
                Place company logos at: public/images/logos/company-name.png
                Then set logoUrl: "/images/logos/company-name.png" in experience.ts
              */}
              <Image
                src={entry.logoUrl}
                alt={`${entry.company} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {entry.company}
              </h3>
              <span className="text-sm font-medium text-amber-600/70 dark:text-gray-500">
                {entry.dateRange}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-green-700 dark:text-amber-400">
              {entry.role}
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {entry.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              <span className="mr-2 text-green-600">&#8226;</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
