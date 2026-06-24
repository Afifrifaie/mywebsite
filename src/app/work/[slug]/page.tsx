import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Target,
  Route,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getProject, getCaseStudies } from "@/data/projects";

export function generateStaticParams() {
  return getCaseStudies().map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study — Afif Rifaie" };

  const title = `${project.title} — Case study | Afif Rifaie`;
  const description = project.tagline ?? project.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [project.image],
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-4 z-50 mx-auto w-full max-w-3xl px-4">
        <nav className="flex items-center justify-between rounded-full border border-border bg-surface/80 px-5 py-2.5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-accent-50 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <Link
            href="/"
            className="font-display text-base font-semibold tracking-tight text-foreground"
          >
            Afif<span className="text-accent">.</span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-16 sm:pt-24">
        {/* Hero */}
        <div className="fade-up">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            {project.client && <span>{project.client}</span>}
            {project.year && (
              <>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{project.year}</span>
              </>
            )}
            {project.role && (
              <>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{project.role}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="mt-5 max-w-2xl text-balance text-lg text-muted">
              {project.tagline}
            </p>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" />
                View code
              </a>
            )}
          </div>

          {/* Stack */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Lead image */}
        {project.gallery && project.gallery[0] && (
          <figure className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.gallery[0].src}
              alt={project.gallery[0].caption ?? project.title}
              className="w-full"
            />
            {project.gallery[0].caption && (
              <figcaption className="border-t border-border px-5 py-3 text-sm text-muted">
                {project.gallery[0].caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm font-medium text-foreground">{h}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem */}
        {project.problem && (
          <Block icon={Target} eyebrow="The problem" title="What needed solving">
            <p className="text-base leading-relaxed text-muted">{project.problem}</p>
          </Block>
        )}

        {/* Approach */}
        {project.approach && project.approach.length > 0 && (
          <Block icon={Route} eyebrow="The approach" title="How I built it">
            <ol className="space-y-4">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-base leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {/* Remaining gallery */}
        {project.gallery && project.gallery.length > 1 && (
          <section className="mt-16 space-y-8">
            {project.gallery.slice(1).map((img) => (
              <figure
                key={img.src}
                className="overflow-hidden rounded-2xl border border-border bg-surface-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.caption ?? project.title} className="w-full" />
                {img.caption && (
                  <figcaption className="border-t border-border px-5 py-3 text-sm text-muted">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

        {/* Outcome */}
        {project.outcome && project.outcome.length > 0 && (
          <Block icon={Trophy} eyebrow="The outcome" title="What it delivers">
            <ul className="space-y-3">
              {project.outcome.map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  <span className="text-base leading-relaxed text-muted">{o}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* Footer CTA */}
        <div className="mt-20 rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Want to see <span className="italic text-accent">more work?</span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Block({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
          <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl font-medium tracking-tight">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
