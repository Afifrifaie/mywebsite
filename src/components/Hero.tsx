import Link from "next/link";
import { ArrowDown } from "lucide-react";
import TypingRoles from "./TypingRoles";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[80vh] w-full max-w-5xl flex-col items-center justify-center px-6 pb-20 pt-24 text-center sm:pt-32"
    >
      <div className="absolute inset-x-0 -top-10 -z-10 mx-auto h-[400px] w-[600px] max-w-full rounded-full bg-accent-soft/40 blur-3xl" />

      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Available for new opportunities
      </span>

      <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Hi, I&rsquo;m <span className="italic text-accent">Afif Rifaie</span>.
        <br className="hidden sm:block" />
        <span className="block sm:inline"> I&rsquo;m a </span>
        <TypingRoles />
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted sm:text-lg">
        I care about making useful things that people genuinely love.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          See my work
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </Link>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
