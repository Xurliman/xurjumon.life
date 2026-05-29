"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { personalContact } from "@/data/personal";
import { useTranslation } from "@/hooks/useTranslation";
import type { ContactDict } from "@/types";
import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  const data = useTranslation<ContactDict>("contact");
  if (!data) return null;

  return (
    <section id="contact" className="relative py-16 md:py-20 lg:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading title={data.heading} />
        </ScrollReveal>
        <div className="flex flex-col items-center text-center">
          <ScrollReveal delay={0.1}>
            <p className="max-w-lg text-base text-gray-600 dark:text-gray-400">
              {data.prompt}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <CopyButton
                text={personalContact.email}
                label={personalContact.email}
                icon={<Mail size={24} className="text-amber-500" />}
              />
              <CopyButton
                text={personalContact.phone}
                label={personalContact.phone}
                icon={<Phone size={24} className="text-green-600" />}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-500">
                {data.alsoFindMe}
              </p>
              <SocialLinks className="justify-center" iconSize={22} />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
