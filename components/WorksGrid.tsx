"use client";
import { useEffect, useRef, useState } from "react";
import { CATS, PROJECTS, type Filter } from "../lib/data";
import { gsap } from "../lib/gsap";
import ProjectCard from "./ProjectCard";

export default function WorksGrid() {
  const [cat, setCat] = useState<Filter>("All");
  const root = useRef<HTMLDivElement>(null);
  const list = PROJECTS.filter(p => cat === "All" || p.cat === cat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", { y: 60, opacity: 0, stagger: 0.07, duration: 0.8, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, [cat]);

  return (
    <div ref={root}>
      <div className="filters">
        {CATS.map(c => (
          <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>
            {c} <sup>{c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.cat === c).length}</sup>
          </button>
        ))}
      </div>
      <div className="pgrid">{list.map(p => <ProjectCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
