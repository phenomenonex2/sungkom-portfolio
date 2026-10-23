"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCE, MILESTONES, PROJECTS, SERVICES, SITE, SKILLS } from "../lib/data";
import { gsap, ScrollTrigger, prefersReducedMotion, reveal, store } from "../lib/gsap";
import ProjectCard from "./ProjectCard";

const WORDS = ["Frontend Engineer", "React & Next.js", "Webflow Developer", "Performance Nerd"];
const STATS: [number, string, string][] = [[10, "+", "Years"], [50, "+", "Projects"], [30, "+", "Clients"], [94, "", "Avg Lighthouse"]];
const MARQUEE = ["React", "Next.js", "TypeScript", "Webflow", "GSAP", "Performance"];

function Typed() {
  const [text, setText] = useState("");
  useEffect(() => {
    let wi = 0, ci = 0, del = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = WORDS[wi];
      ci += del ? -1 : 1;
      setText(w.slice(0, ci));
      if (!del && ci === w.length) { del = true; t = setTimeout(tick, 1400); return; }
      if (del && ci === 0) { del = false; wi = (wi + 1) % WORDS.length; }
      t = setTimeout(tick, del ? 35 : 75);
    };
    tick();
    return () => clearTimeout(t);
  }, []);
  return <span className="rot">{text}</span>;
}

const Chars = ({ text }: { text: string }) => (
  <span className="ln">{[...text].map((c, i) => <span className="ch" key={i}>{c}</span>)}</span>
);

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [pre, setPre] = useState(true);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const fine = matchMedia("(pointer: fine)").matches;
    let mm: ((e: MouseEvent) => void) | undefined;
    const ctx = gsap.context(() => {
      const intro = () => {
        gsap.timeline()
          .from(".hero h1 .ch", { yPercent: 115, rotate: 8, stagger: 0.025, duration: 1, ease: "power4.out" })
          .from(".hero .role > *", { y: 20, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.5")
          .from(".nav", { y: -40, opacity: 0, duration: 0.7 }, "<");
      };

      if (reduce || store.get("seen")) { setPre(false); intro(); } else {
        store.set("seen", "1");
        const n = { v: 0 };
        gsap.to(n, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => setNum(Math.round(n.v)),
          onComplete: () => { gsap.to("#pre", { yPercent: -100, duration: 0.9, ease: "power4.inOut", onStart: intro, onComplete: () => setPre(false) }); } });
      }

      if (fine && !reduce) {
        const ox = gsap.quickTo(".orb", "x", { duration: 1.2 }), oy = gsap.quickTo(".orb", "y", { duration: 1.2 });
        mm = (e: MouseEvent) => { ox((e.clientX / innerWidth - 0.5) * -120); oy((e.clientY / innerHeight - 0.5) * -120); };
        addEventListener("mousemove", mm);
      }

      gsap.to(".photo img", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".photo", scrub: true } });
      root.current!.querySelectorAll<HTMLElement>(".stat b").forEach(b => {
        const o = { v: 0 }, to = +b.dataset.to!;
        gsap.to(o, { v: to, duration: 2, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => { b.textContent = String(Math.round(o.v)); } });
      });

      ScrollTrigger.matchMedia({ "(min-width: 861px)": () => {
        const tr = root.current!.querySelector<HTMLElement>("#track")!;
        gsap.to(tr, { x: () => -(tr.scrollWidth - innerWidth + 40), ease: "none",
          scrollTrigger: { trigger: ".ms", pin: true, scrub: 0.6, start: "top top", end: () => "+=" + tr.scrollWidth, invalidateOnRefresh: true } });
      } });

      reveal(root.current!, ".lead, .sk, .job, .svc div, .card, .cta > *");
      reveal(root.current!, ".sec-h", { y: 30 });
    }, root);
    return () => { ctx.revert(); if (mm) removeEventListener("mousemove", mm); };
  }, []);

  return (
    <div ref={root}>
      {pre && <div id="pre"><small>LOADING PORTFOLIO</small><span><b>{num}</b>%</span></div>}

      <section className="hero">
        <div className="grid-bg" /><div className="orb" />
        <div className="wrap" style={{ width: "100%" }}>
          <span className="pill">Available for new projects · Bangkok / Remote</span>
          <h1 style={{ marginTop: 28 }}><Chars text="Sungkom" /><Chars text="Wongussapaiboon" /></h1>
          <div className="role">
            <span>Senior</span><Typed />
            <Link className="btn solid" href="/works" style={{ marginLeft: "auto" }}>View works →</Link>
          </div>
        </div>
      </section>

      <div className="marq" aria-hidden="true"><div>
        {[...MARQUEE, ...MARQUEE].map((w, i) => <span key={i}>{w}</span>)}
      </div></div>

      <section id="about"><div className="wrap about">
        <div className="photo"><img src={SITE.photo} alt="Sungkom" /></div>
        <div>
          <p className="mono">About</p>
          <p className="lead" style={{ marginTop: 20 }}>Frontend specialist in <em>React, Next.js &amp; TypeScript</em> who ships fast, maintainable, user-first products — and can own backend logic, CMS integration or a performance audit when needed.</p>
          <div className="stats">
            {STATS.map(([n, s, l]) => (
              <div className="stat" key={l}><b data-to={n}>0</b>{s}<span className="mono"><br />{l}</span></div>
            ))}
          </div>
        </div>
      </div></section>

      <section className="ms" style={{ paddingBlock: 0 }}><div className="wrap" style={{ paddingBlock: "100px 80px" }}>
        <div className="sec-h" style={{ margin: "0 0 50px" }}><h2>Career <em>path</em></h2><span className="mono">Scroll →</span></div>
        <div id="track" className="ms-track" style={{ paddingInline: 0 }}>
          {MILESTONES.map(([y, t, d]) => (
            <div className="ms-card" key={y}><b>{y}</b><div><h3>{t}</h3><p>{d}</p></div></div>
          ))}
        </div>
      </div></section>

      <section><div className="wrap">
        <div className="sec-h"><h2>The <em>stack</em></h2><span className="mono">Skills &amp; tools</span></div>
        {Object.entries(SKILLS).map(([k, v]) => (
          <div className="sk" key={k}><h3>{k}</h3><div className="chips">{v.map(s => <span className="chip" key={s}>{s}</span>)}</div></div>
        ))}
      </div></section>

      <section id="works"><div className="wrap">
        <div className="sec-h"><h2>Selected <em>work</em></h2><Link className="btn" href="/works">All {PROJECTS.length} projects →</Link></div>
        <div className="pgrid">{PROJECTS.slice(0, 6).map(p => <ProjectCard key={p.slug} p={p} />)}</div>
      </div></section>

      <section id="experience"><div className="wrap">
        <div className="sec-h"><h2>Experience</h2><span className="mono">2014 — Now</span></div>
        {EXPERIENCE.map(j => (
          <div className="job" key={j.co}>
            <span className="mono">{j.when}</span>
            <div><h3>{j.co}</h3><span className="mono">{j.role}</span></div>
            <ul>{j.pts.map(p => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </div></section>

      <section><div className="wrap">
        <div className="sec-h"><h2>How I <em>help</em></h2></div>
        <div className="svc">
          {SERVICES.map(([t, d], i) => <div key={t}><span className="mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </div></section>

      <section id="contact"><div className="wrap cta">
        <p className="mono">Got an idea?</p>
        <a className="big" href={`mailto:${SITE.email}`}>Let&apos;s build something great</a>
        <a className="btn solid" href={`mailto:${SITE.email}`}>{SITE.email} ↗</a>
      </div></section>
    </div>
  );
}
