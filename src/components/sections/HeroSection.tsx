"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "@/hooks/useTranslation";
import type { AboutDict } from "@/types";
import { MapPin } from "lucide-react";

export function HeroSection() {
  const about = useTranslation<AboutDict>("about");
  if (!about) return null;

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="hero-glow -left-32 top-20 h-72 w-72 bg-amber-400" />
      <div className="hero-glow -right-32 bottom-20 h-72 w-72 bg-green-500" style={{ animationDelay: "2s" }} />
      <div className="hero-glow left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-yellow-300" style={{ animationDelay: "4s" }} />

      <Container className="relative">
        <ScrollReveal>
          <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-100">
                {about.greeting}{" "}
                <span className="gradient-text">{about.firstName}</span>{" "}
                <span className="inline-block origin-[70%_70%] animate-[wave_2s_ease-in-out_infinite]">
                  👋
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
                {about.bio}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge className="gap-1.5">
                  <MapPin size={14} className="text-green-700 dark:text-green-400" />
                  {about.location}
                </Badge>
                <Badge className="gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                  </span>
                  {about.status}
                </Badge>
              </div>
              <SocialLinks className="mt-6" iconSize={22} />
            </div>

            <div className="relative flex-shrink-0">
              <div className="profile-ring absolute -inset-2 animate-spin-slow rounded-full opacity-70 blur-sm dark:opacity-60" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full bg-amber-50 ring-4 ring-white md:h-72 md:w-72 dark:bg-gray-800 dark:ring-gray-950">
                <Image
                  src="/images/profile/photo.jpg"
                  alt={`${about.firstName} ${about.lastName}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
