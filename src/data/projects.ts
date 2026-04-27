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
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "Hangman",
    description:
      "A word-guessing game with a programming-language twist — guess letters before the language goes extinct.",
    image: "/projects/hangman.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "",
    repoUrl: "https://github.com/Afifrifaie",
  },
  {
    title: "E-Commerce Store",
    description:
      "A shopping experience with cart, product browsing, and checkout flow, powered by the DummyJSON API.",
    image: "/projects/ecommerce.png",
    stack: ["HTML", "CSS", "React"],
    liveUrl: "",
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
];
