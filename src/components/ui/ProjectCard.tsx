"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import { Badge } from "./Badge";
import { Lightbox } from "./Lightbox";
import { ExternalLink, Maximize2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isReversed = index % 2 !== 0;

  const gallery = [project.imageUrl, ...(project.images ?? [])];
  const hasVideo = !!project.videoUrl;

  return (
    <>
      <div className="group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-amber-100/80 transition-all hover:shadow-xl hover:shadow-amber-200/30 dark:bg-gray-900 dark:ring-gray-800/50 dark:hover:shadow-green-900/10">
        <div
          className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        >
          {/* Media (image or video). Clicking the image opens the lightbox. */}
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-amber-200 via-yellow-100 to-green-100 lg:w-1/2 dark:from-amber-950/50 dark:via-yellow-950/30 dark:to-green-950/30">
            {hasVideo ? (
              <video
                src={project.videoUrl}
                muted
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`Open ${project.title} gallery`}
                className="group/img relative block h-full w-full cursor-zoom-in"
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/img:bg-black/20 group-hover/img:opacity-100">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-900 shadow-lg">
                    <Maximize2 size={12} />
                    {gallery.length > 1 ? `View ${gallery.length} photos` : "View"}
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 lg:w-1/2 lg:p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-green-700 dark:text-amber-400">
              {project.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            {(project.githubUrl || project.liveUrl) && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-amber-400/40 dark:hover:text-amber-400"
                  >
                    <SiGithub size={15} />
                    <span>Source</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-green-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-amber-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/35 hover:brightness-110"
                  >
                    <ExternalLink size={15} />
                    <span>Live demo</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {!hasVideo && (
        <Lightbox
          images={gallery}
          alt={project.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
