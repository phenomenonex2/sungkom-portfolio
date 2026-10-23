"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "../lib/data";
import { gsap, reveal } from "../lib/gsap";
import Cover from "./Cover";

export default function ProjectView({ p, next }: { p: Project; next: Project }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#title, #cat, #info > *", { y: 80, opacity: 0, stagger: 0.1, duration: 1, ease: "power4.out" });
      gsap.from("#img", { clipPath: "inset(18% 12% 18% 12% round 20px)", duration: 1.4, ease: "power4.out", delay: 0.3 });
      gsap.to("#img img, #img .ph", { yPercent: 8, ease: "none", scrollTrigger: { trigger: "#img", scrub: true } });
      reveal(root.current!, ".p-body > *");
    }, root);
    return () => ctx.revert();
  }, []);

  const info: [string, string | number][] = [["Role", p.role], ["Year", p.year], ["Category", p.cat], ["Stack", p.tags.join(", ")]];

  return (
    <div ref={root}>
      <section className="p-hero" style={{ paddingBottom: 0 }}><div className="wrap">
        <p className="mono" id="cat">{p.cat} · {p.year}</p>
        <h1 id="title" style={{ marginTop: 20 }}>{p.name}</h1>
        <div className="p-info" id="info">
          {info.map(([k, v]) => <div key={k}><span className="mono">{k}</span><b>{v}</b></div>)}
        </div>
        <div className="p-img" id="img"><Cover p={p} /></div>
        <div className="p-body">
          <div>
            <p className="mono">Overview</p>
            <div className="chips" style={{ marginTop: 20 }}>{p.tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>
            <div style={{ marginTop: 30 }}>
              {p.url
                ? <a className="btn solid" href={p.url} target="_blank" rel="noopener">Visit live site ↗</a>
                : <span className="pill">Live site not available</span>}
            </div>
          </div>
          <div>
            <p className="lead">{p.long}</p>
            <p className="mono" style={{ margin: "40px 0 12px" }}>Outcome</p>
            <p style={{ fontSize: 20, color: "var(--mut)" }}>{p.outcome}</p>
          </div>
        </div>
      </div></section>
      <Link className="next" href={`/works/${next.slug}`} style={{ marginTop: 100 }}>
        <p className="mono">Next project</p>
        <h2 className="disp" style={{ marginTop: 20 }}>{next.name}</h2>
      </Link>
    </div>
  );
}
