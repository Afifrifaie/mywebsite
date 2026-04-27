export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Afif Rifaie. All rights reserved.</p>
        <p>
          Built with <span className="text-accent">Next.js</span> &{" "}
          <span className="text-accent">Tailwind</span>.
        </p>
      </div>
    </footer>
  );
}
