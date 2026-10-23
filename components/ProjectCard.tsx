import Link from "next/link";
import type { Project } from "../lib/data";
import Cover from "./Cover";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="card" href={`/works/${p.slug}`}>
      <div className="cover">
        <span className="badge">{p.cat} · {p.year}</span>
        <Cover p={p} />
        <span className="go">↗</span>
      </div>
      <div className="meta">
        <div><h3>{p.name}</h3><p>{p.desc}</p></div>
        <span className="mono">{p.role.split(" ")[0]}</span>
      </div>
    </Link>
  );
}
