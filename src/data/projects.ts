export type Project = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
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
  {
    title: "Trainer Tracking App",
    description:
      "Helps personal trainers log client progress and automatically email status reports back to their clients.",
    image: "/projects/trainer.png",
    stack: ["React", "TypeScript", "Tailwind", "Lucide", "Resend"],
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
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
    title: "Math Arcade",
    description:
      "A web app that helps teachers manage and track the award stamps they give students — searchable and filterable by class and primary level.",
    image: "/projects/math-arcade.png",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Firebase"],
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
  },
];
