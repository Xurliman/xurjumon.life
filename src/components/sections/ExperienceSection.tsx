"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/hooks/useTranslation";
import type { ExperienceDict } from "@/types";

export function ExperienceSection() {
  const data = useTranslation<ExperienceDict>("experience");
  if (!data) return null;

  return (
    <section id="experience" className="py-16 md:py-20 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={data.heading} />
        </ScrollReveal>
        <div className="mx-auto max-w-3xl">
          {data.items.map((entry, i) => (
            <ScrollReveal key={entry.id} delay={i * 0.1}>
              <ExperienceCard entry={entry} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
