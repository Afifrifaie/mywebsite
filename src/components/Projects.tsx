import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...projects, ...projects];

  return (
    <section id="projects" className="w-full py-20">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Projects
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          A small selection of <span className="italic text-accent">recent work</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          Hover to pause. Each card lights up the closer you get.
        </p>
      </div>

      <div className="marquee-pause group relative w-full overflow-hidden">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-6 px-6">
          {loop.map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              project={project}
              variant="fixed"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <div className="mb-8 text-center">
          <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Or browse them all <span className="italic text-accent">at once</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={`grid-${project.title}`}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
