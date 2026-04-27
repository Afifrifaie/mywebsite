import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const links = [
  {
    href: "mailto:afifrifaie@gmail.com",
    label: "afifrifaie@gmail.com",
    icon: Mail,
  },
  {
    href: "https://github.com/Afifrifaie",
    label: "github.com/Afifrifaie",
    icon: GithubIcon,
  },
  {
    href: "https://www.linkedin.com/in/afifrifaie",
    label: "linkedin.com/in/afifrifaie",
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 sm:p-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-soft/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-warm-2/50 blur-3xl" />

        <div className="relative text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Let&rsquo;s talk
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Ready to build something <span className="italic text-accent">people love?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            I&rsquo;m open to front end and AI web developer roles, freelance, and
            collaborations. Reach out and let&rsquo;s chat.
          </p>

          <a
            href="mailto:afifrifaie@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Send me an email
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm text-foreground transition-all hover:border-accent hover:bg-accent-50 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
