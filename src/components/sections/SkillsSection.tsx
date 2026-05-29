"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillItem } from "@/components/ui/SkillItem";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skills } from "@/data/skills";
import { useTranslation } from "@/hooks/useTranslation";
import type { UiDict } from "@/types";

export function SkillsSection() {
  const ui = useTranslation<UiDict>("ui");

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={ui?.skills.heading ?? ""}
            subtitle={ui?.skills.subtitle}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mx-auto grid max-w-3xl grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {skills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
