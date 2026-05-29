"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/hooks/useTranslation";
import type { WorkDict } from "@/types";

export function WorkSection() {
  const data = useTranslation<WorkDict>("work");
  if (!data) return null;

  return (
    <section id="work" className="py-16 md:py-20 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={data.heading} subtitle={data.subtitle} />
        </ScrollReveal>
        <div className="space-y-12 md:space-y-16">
          {data.items.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.1}>
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
