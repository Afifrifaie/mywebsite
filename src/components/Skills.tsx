"use client";

import {
  Code2,
  Database,
  Bot,
  Palette,
} from "lucide-react";

type Skill = { name: string };
type Category = {
  title: string;
  description: string;
  icon: React.ElementType;
  hoverBg: string; // CSS var token
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Frontend",
    description: "Where I spend most of my craft.",
    icon: Code2,
    hoverBg: "var(--warm-2)",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend & Data",
    description: "Wiring up the real-world bits.",
    icon: Database,
    hoverBg: "var(--warm-4)",
    skills: [{ name: "Supabase" }],
  },
  {
    title: "AI",
    description: "Building intelligent, useful experiences.",
    icon: Bot,
    hoverBg: "var(--warm-5)",
    skills: [{ name: "Claude" }],
  },
  {
    title: "Design & Tooling",
    description: "Translating intent into pixels.",
    icon: Palette,
    hoverBg: "var(--warm-3)",
    skills: [{ name: "Figma" }, { name: "Lucide React" }],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Skills
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Tools <span className="italic text-accent">I love working with</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-foreground"
              style={{
                ["--hover-bg" as string]: cat.hoverBg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = cat.hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <Icon className="mb-5 h-7 w-7 text-foreground" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-medium">{cat.title}</h3>
              <p className="mb-5 mt-1 text-sm text-muted">{cat.description}</p>

              <ul className="mt-auto flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-full border border-border/80 bg-surface/70 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
