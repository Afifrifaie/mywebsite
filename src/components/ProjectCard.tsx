"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/projects";

const STACK_COLORS: Record<string, string> = {
  HTML: "#e34c26",
  CSS: "#264de4",
  React: "#61dafb",
  "Next.js": "#0a0a0a",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Tailwind: "#38bdf8",
  Supabase: "#3ecf8e",
  Lucide: "#118ab2",
  Resend: "#000000",
  AWS: "#ff9900",
};

type Props = {
  project: Project;
  variant?: "fixed" | "fluid";
};

export default function ProjectCard({ project, variant = "fluid" }: Props) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const sizeClass =
    variant === "fixed"
      ? "w-[320px] shrink-0 sm:w-[380px]"
      : "w-full";

  return (
    <article
      onMouseMove={handleMouseMove}
      className={`glow-card group relative flex h-full ${sizeClass} flex-col overflow-hidden rounded-2xl border border-border bg-surface`}
    >
      {/* Whole-card clickable overlay (live URL takes precedence, then repo) */}
      {(project.liveUrl || project.repoUrl) && (
        <a
          href={project.liveUrl || project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 z-20"
        />
      )}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
          <span className="-z-10">{project.title} preview</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-medium">{project.title}</h3>
          <div className="relative z-30 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} repository`}
                className="rounded-full p-1.5 text-muted hover:bg-accent-50 hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="rounded-full p-1.5 text-muted hover:bg-accent-50 hover:text-accent"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              title={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-foreground"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: STACK_COLORS[tech] || "#118ab2" }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
