import { SITE } from "../lib/data";

export default function Footer() {
  return (
    <footer>
      <span>© 2026 {SITE.name}. Built with Next.js, TypeScript &amp; GSAP.</span>
      <nav>
        <a href={SITE.github} target="_blank" rel="noopener">GitHub</a>
        <a href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a href={`mailto:${SITE.email}`}>Email</a>
      </nav>
    </footer>
  );
}
