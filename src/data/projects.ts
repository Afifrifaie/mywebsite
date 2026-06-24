export type CaseStudyImage = {
  src: string;
  caption?: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;

  // Case study (optional — only the strongest projects have one)
  slug?: string;
  featured?: boolean;
  client?: string;
  year?: string;
  role?: string;
  // Short one-liner shown under the case-study hero
  tagline?: string;
  problem?: string;
  approach?: string[];
  outcome?: string[];
  highlights?: string[];
  gallery?: CaseStudyImage[];
};

export const projects: Project[] = [
  {
    title: "Nafiis Syukri — Strength & Mobility Coaching",
    description:
      "A conversion-focused, fully content-managed coaching website for a fitness coach — built on a Sanity CMS so the owner can edit every section, with structured-data SEO baked in.",
    image: "/projects/nafiis.png",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Sanity"],
    liveUrl: "https://sfm-nafiis.vercel.app/",
    repoUrl: "https://github.com/Afifrifaie",
    slug: "nafiis",
    featured: true,
    client: "Self-initiated spec build",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "A self-initiated spec build: an agency-grade, lead-generating site a non-technical owner can run entirely on their own.",
    problem:
      "Nafiis, a strength & mobility coach for Muslim men, had a growing Instagram following but no website to turn that interest into booked consultations. I set out to build the site I'd pitch him: something that looks the part, converts visitors into enquiries, ranks on Google, and — crucially — that a non-technical owner can keep up to date without ever touching code.",
    approach: [
      "Studied his Instagram presence to derive the brand: tone, photography, and the faith-and-fitness positioning that makes him distinct.",
      "Designed a conversion-first landing page — clear hero, program tiers, results/testimonials, FAQ, and prominent WhatsApp + book-a-call CTAs throughout.",
      "Architected the entire site on a Sanity CMS so every section (hero, programs, testimonials, FAQ, navbar, footer) is editable by the owner, with a friendly editor UI and a draft → publish workflow.",
      "Engineered SEO from the ground up: JSON-LD structured data (Person, FAQPage, Service), Open Graph & Twitter cards, sitemap, robots rules, and Google Search Console verification.",
      "Built it mobile-first with graceful fallbacks so the page always renders cleanly, even before any content is published.",
    ],
    outcome: [
      "A live, agency-grade marketing site that mirrors the exact service a web-design agency sells: custom design, CMS handover, and SEO.",
      "Non-technical content editing: the owner can change copy, swap photos, add testimonials, and reorder programs entirely from the Studio.",
      "Search-ready out of the box — rich results eligible via structured data, with shareable social previews.",
    ],
    highlights: [
      "Full Sanity CMS — every section content-managed",
      "Draft & publish workflow for safe edits",
      "JSON-LD structured data (Person / FAQPage / Service)",
      "Open Graph + Twitter social cards",
      "Sitemap, robots & Search Console verification",
      "Mobile-first, conversion-focused layout",
    ],
    gallery: [
      {
        src: "/projects/nafiis-home.png",
        caption: "The full landing page — hero, approach, programs, results, and FAQ.",
      },
      {
        src: "/projects/nafiis-studio.png",
        caption:
          "The Sanity Studio: the owner edits every section here, with a draft → publish workflow.",
      },
      {
        src: "/projects/nafiis.png",
        caption: "Designed Open Graph card for rich social sharing.",
      },
    ],
  },
  {
    title: "Math Arcade",
    description:
      "A web app that helps teachers manage and track the award stamps they give students — searchable and filterable by class and primary level.",
    image: "/projects/math-arcade.png",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Firebase"],
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
    slug: "math-arcade",
    featured: true,
    client: "Built for classroom teachers",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "A real tool for real teachers — turning a manual stamp-tracking chore into a searchable, filterable dashboard.",
    problem:
      "Teachers reward students with award stamps but track them on paper, which makes it hard to see who's earned what across classes and levels. The goal was a simple, fast tool that makes managing and finding that data effortless.",
    approach: [
      "Designed a clean dashboard centred on the one job teachers do most: finding and updating a student's stamps quickly.",
      "Built search and filtering by class and primary level so the right records surface in seconds.",
      "Used Firebase for live data and auth, keeping the stack lean and the app fast to load.",
    ],
    outcome: [
      "A working app teachers can actually use day-to-day instead of paper.",
      "Instant search and filtering replaces manual lookup across classes.",
    ],
    highlights: [
      "Searchable & filterable by class and level",
      "Firebase realtime data + auth",
      "Built for non-technical everyday users",
    ],
    gallery: [
      {
        src: "/projects/math-arcade.png",
        caption: "The teacher dashboard — searchable, filterable stamp tracking.",
      },
    ],
  },
  {
    title: "Trainer Tracking App",
    description:
      "Helps personal trainers log client progress and automatically email status reports back to their clients.",
    image: "/projects/trainer.png",
    stack: ["React", "TypeScript", "Tailwind", "Lucide", "Resend"],
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
    slug: "trainer-tracker",
    featured: true,
    client: "Built for personal trainers",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "Closes the loop between trainers and clients — log progress once, and clients get an automated report by email.",
    problem:
      "Personal trainers track client progress in scattered notes and rarely report back to clients in a consistent way. The app needed to make logging progress quick and turn it into automatic, professional client updates.",
    approach: [
      "Designed a focused logging flow so trainers can record a client's progress in a few taps.",
      "Wired automated status-report emails to clients using Resend, so reporting happens without extra work.",
      "Kept the UI clean and lightweight with React, Tailwind, and Lucide icons.",
    ],
    outcome: [
      "Trainers log once and clients receive a polished progress report automatically.",
      "Turns an inconsistent manual chore into a reliable, repeatable touchpoint.",
    ],
    highlights: [
      "Automated client report emails (Resend)",
      "Fast, focused progress-logging flow",
      "Clean, lightweight React UI",
    ],
    gallery: [
      {
        src: "/projects/trainer.png",
        caption: "The trainer's client-progress logging view.",
      },
    ],
  },
  {
    title: "Asset Health Monitor",
    description:
      "A real-time dashboard for tracking the health and status of physical assets, with AWS-powered telemetry.",
    image: "/projects/asset-health.png",
    stack: ["React", "TypeScript", "Tailwind", "AWS"],
    liveUrl: "https://assethealth.netlify.app/",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "Tenzies",
    description:
      "A fast-paced dice game where you lock in matching numbers to win — built as a React state-management exercise.",
    image: "/projects/tenzies.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "https://tenzies-afif.netlify.app/",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "Hangman",
    description:
      "A word-guessing game with a programming-language twist — guess letters before the language goes extinct.",
    image: "/projects/hangman.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "https://hangman-afif.netlify.app/",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "E-Commerce Store",
    description:
      "A shopping experience with cart, product browsing, and checkout flow, powered by the DummyJSON API.",
    image: "/projects/ecommerce.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "https://leshop-afif.netlify.app/",
    repoUrl: "https://github.com/Afifrifaie",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudies(): Project[] {
  return projects.filter((p) => p.slug);
}
