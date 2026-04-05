"use client";

import Link from "next/link";
import {
  getFeaturedProject,
  getGridProjects,
  type Project,
} from "@/content/projects";

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-10 transition-colors duration-300 hover:border-[var(--accent)] ${
        featured
          ? "md:col-span-2 md:bg-gradient-to-br md:from-[var(--surface)] md:to-[rgba(108,99,255,0.05)]"
          : ""
      }`}
    >
      <div className="absolute -right-[100px] -top-[100px] h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <p className="font-[family-name:var(--font-dm-mono)] mb-5 text-[10px] tracking-[0.2em] text-[var(--muted)]">
        {project.num}
        {featured ? " / Featured" : ""}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="font-[family-name:var(--font-dm-mono)] border border-[var(--border)] px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]"
          >
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-[family-name:var(--font-syne)] mb-3 text-[22px] font-bold tracking-[-0.5px]">
        {project.name}
      </h3>
      <p className="mb-8 text-[13px] leading-[1.7] text-[var(--muted)]">
        {featured ? project.description : project.tagline}
      </p>
      <div className="flex gap-4">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-dm-mono)] flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] no-underline transition-[gap] duration-300 hover:gap-2.5"
          >
            Live Demo →
          </Link>
        )}
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-dm-mono)] flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] no-underline transition-[gap] duration-300 hover:gap-2.5"
          >
            GitHub →
          </Link>
        )}
        {!project.liveUrl && !project.githubUrl && (
          <span className="font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
            —
          </span>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const featured = getFeaturedProject();
  const rest = getGridProjects().slice(0, 4);

  return (
    <section
      id="projects"
      className="px-6 py-[120px] md:px-[60px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Selected Work
            </p>
            <h2 className="font-[family-name:var(--font-syne)] text-[clamp(36px,5vw,60px)] font-extrabold leading-none tracking-[-2px]">
              Things I&apos;ve
              <br />
              Built
            </h2>
          </div>
          <Link
            href="https://github.com/Samkit02"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--border)] px-7 py-3 text-[13px] text-[var(--text)] no-underline transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            View All →
          </Link>
        </div>
        <div className="reveal grid grid-cols-1 gap-0.5 md:grid-cols-3">
          <ProjectCard project={featured} featured />
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
