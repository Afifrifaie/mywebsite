export type CaseStudyImage = {
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;

  // Case study (optional, only the strongest projects have one)
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
    title: "Nafiis Syukri: Strength & Mobility Coaching",
    description:
      "A coaching website designed to turn Instagram followers into booked clients, with the owner able to edit every word, photo, and price themselves without a developer.",
    image: "/projects/nafiis.png",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Sanity"],
    liveUrl: "https://sfm-nafiis.vercel.app/",
    slug: "nafiis",
    featured: true,
    client: "Self-initiated spec build",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "A custom-designed coaching site that's easy to run yourself and built to bring in enquiries. I built it end to end as a self-directed project, to practise the kind of work I'd love to do for clients.",
    problem:
      "Nafiis is a strength & mobility coach with a growing Instagram following, but no website to turn that attention into bookings. So I built the kind of site I'd want to make for a client like him: one that looks professional, helps turn visitors into enquiries, shows up on Google, and, most importantly, that he could update himself anytime, without paying a developer for every small change.",
    approach: [
      "Studied his Instagram to capture his real voice and look, including the faith-and-fitness angle that sets him apart, so the site feels unmistakably his.",
      "Designed every page around one goal: getting visitors to book. Clear headline, simple program options, real testimonials, an FAQ, and 'message on WhatsApp / book a call' buttons throughout.",
      "Set it up so the owner can edit any part of the site himself (text, photos, prices, testimonials) through a simple editor, with a 'preview before it goes live' safety net.",
      "Built it to be found on Google: the technical SEO groundwork so the business can show up in search and look polished when shared on WhatsApp or Instagram.",
      "Designed mobile-first, since that's where his audience is, so it looks sharp on a phone every time.",
    ],
    outcome: [
      "A professional marketing site with the essentials a small business needs: custom design, full owner control, and SEO built in.",
      "The owner runs it himself: change wording, swap photos, add a testimonial, or reorder programs in minutes, no developer needed.",
      "Built to be discovered, with the SEO groundwork in place and a polished preview when someone shares the link.",
    ],
    highlights: [
      "Edit every section yourself, no developer needed (Sanity CMS)",
      "Preview changes safely before they go live (draft → publish)",
      "Built so Google can find and feature the business (structured data)",
      "Looks polished when shared on WhatsApp & social (social cards)",
      "Set up to be discovered in search (sitemap + Search Console)",
      "Designed to turn phone visitors into bookings (mobile-first)",
    ],
    gallery: [
      {
        src: "/projects/nafiis-home.png",
        width: 1920,
        height: 9427,
        caption: "The full site, built around one job: helping turn visitors into booked clients.",
      },
      {
        src: "/projects/nafiis-studio.png",
        width: 1897,
        height: 863,
        caption:
          "Behind the scenes: the owner edits every section here himself, and previews before publishing.",
      },
      {
        src: "/projects/nafiis.png",
        width: 1200,
        height: 630,
        caption: "How the site looks when shared on WhatsApp or social: polished, not a bare link.",
      },
    ],
  },
  {
    title: "Math Arcade",
    description:
      "An app that replaces a teacher's paper stamp chart, so they can find any student's reward stamps in seconds, across every class and year level, instead of flipping through pages.",
    image: "/projects/math-arcade.png",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Firebase"],
    liveUrl: "",
    slug: "math-arcade",
    featured: true,
    client: "Built for classroom teachers",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "Built for real teachers, turning the paper chore of tracking reward stamps into something you can search in seconds.",
    problem:
      "Teachers give students reward stamps but track them on paper, so it's slow and frustrating to check who's earned what across different classes and year levels. They needed a simple, fast tool that makes finding and updating that information effortless.",
    approach: [
      "Designed the whole app around the one thing teachers do most: quickly finding and updating a student's stamps.",
      "Made it searchable and filterable by class and year level, so the right student comes up in seconds instead of a page-flip.",
      "Built it to update instantly and stay fast to load, with secure sign-in for teachers (Firebase).",
    ],
    outcome: [
      "A working app teachers can use every day in place of paper.",
      "Finding a student now takes seconds, not minutes of searching.",
    ],
    highlights: [
      "Find any student in seconds (search & filter by class and level)",
      "Updates instantly, with secure teacher sign-in (Firebase)",
      "Simple enough for any teacher, no tech skills needed",
    ],
    gallery: [
      {
        src: "/projects/math-arcade.png",
        width: 875,
        height: 742,
        caption: "The teacher's dashboard: find and update any student's stamps in seconds.",
      },
    ],
  },
  {
    title: "Trainer Tracking App",
    description:
      "Lets personal trainers log a client's progress once, and the client automatically gets a polished progress report by email, no extra work.",
    image: "/projects/trainer.png",
    stack: ["React", "TypeScript", "Tailwind", "Lucide", "Resend"],
    liveUrl: "",
    slug: "trainer-tracker",
    featured: true,
    client: "Built for personal trainers",
    year: "2026",
    role: "Design & full-stack development",
    tagline:
      "Keeps trainers and clients connected: log progress once, and the client gets an automatic report by email.",
    problem:
      "Personal trainers keep client progress in scattered notes and rarely send clients a consistent update. The app needed to make logging progress quick and turn it into automatic, professional updates that keep clients engaged.",
    approach: [
      "Designed a quick logging flow so a trainer can record a client's progress in a few taps.",
      "Set it up to email each client a clean progress report automatically, so updates happen without the trainer lifting a finger.",
      "Kept the app simple, fast, and easy to use on any device.",
    ],
    outcome: [
      "Trainers log once and clients get a professional progress report automatically.",
      "Turns an inconsistent, easily-forgotten task into a reliable client touchpoint.",
    ],
    highlights: [
      "Clients get progress reports by email automatically",
      "Log a client's progress in a few taps",
      "Simple, fast, and easy to use on any device",
    ],
    gallery: [
      {
        src: "/projects/trainer.png",
        width: 1920,
        height: 1107,
        caption: "Where the trainer logs a client's progress, then the email report sends itself.",
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
      "A fast-paced dice game where you lock in matching numbers to win, built as a React state-management exercise.",
    image: "/projects/tenzies.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "https://tenzies-afif.netlify.app/",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "Hangman",
    description:
      "A word-guessing game with a programming-language twist: guess letters before the language goes extinct.",
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
