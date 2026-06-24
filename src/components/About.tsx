import { Sparkles, Wrench, Hammer } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          A few <span className="italic text-accent">things about me</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Big card */}
        <article className="glow-card relative col-span-1 row-span-2 flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 sm:col-span-2 lg:col-span-2">
          <div>
            <Sparkles className="mb-5 h-8 w-8 text-accent" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-medium leading-snug">
              I combine development and design
              <span className="text-muted"> to build clean, user-friendly websites that stand out.</span>
            </h3>
          </div>
          <p className="mt-6 text-sm text-muted">
            I love turning ideas into production-ready interfaces that feel fast,
            intentional, and useful.
          </p>
        </article>

        {/* Tech stack card */}
        <article className="glow-card rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <Wrench className="mb-4 h-6 w-6 text-accent" strokeWidth={1.5} />
          <h3 className="mb-1 font-display text-lg font-medium">My core stack</h3>
          <p className="mb-4 text-sm text-muted">
            Always learning, always refining the craft.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "AWS", "Figma", "UI/UX"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </article>

        {/* Currently building */}
        <article className="glow-card relative overflow-hidden rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          {/* Background image — right half of image shown, on right side of card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-cover bg-no-repeat opacity-70"
            style={{
              backgroundImage: "url('/about/trainer-tracker.png')",
              backgroundPosition: "left top",
            }}
          />
          {/* Soft fade from left so text stays readable */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"
          />

          <div className="relative max-w-[55%]">
            <Hammer className="mb-4 h-6 w-6 text-accent" strokeWidth={1.5} />
            <h3 className="mb-1 font-display text-lg font-medium">
              Currently building
            </h3>
            <p className="text-sm text-muted">
              Working with{" "}
              <a
                href="https://www.linkedin.com/in/nafiis-syukri-80360b232/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Nafiis
              </a>
              , a physical trainer, on a client progress tracking app for his coaching practice.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
