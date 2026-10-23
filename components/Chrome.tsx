"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, store } from "../lib/gsap";

/** Persistent shell: nav, scroll progress, custom cursor, magnetic buttons, card tilt, page-wipe transition. */
export default function Chrome() {
  const path = usePathname();
  const router = useRouter();

  // play the wipe-out after a client navigation
  useEffect(() => {
    if (store.get("nav")) {
      store.set("nav", "");
      gsap.fromTo("#wipe", { yPercent: 0 }, { yPercent: -100, duration: 0.7, ease: "power4.inOut" });
    }
  }, [path]);

  useEffect(() => {
    gsap.set("#wipe", { yPercent: 100, visibility: "visible" });
    const bar = gsap.to("#bar", { scaleX: 1, ease: "none", scrollTrigger: { scrub: 0.2, start: 0, end: "max" } });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target || e.metaKey || e.ctrlKey || a.origin !== location.origin) return;
      if (a.pathname === location.pathname) return;
      e.preventDefault();
      store.set("nav", "1");
      // timeout fallback: rAF is paused in background tabs, so never rely on the tween alone
      let done = false;
      const go = () => { if (!done) { done = true; router.push(a.pathname + a.hash); } };
      gsap.fromTo("#wipe", { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "power4.inOut", onComplete: go });
      setTimeout(go, 900);
    };
    document.addEventListener("click", onClick, true);

    const fine = matchMedia("(pointer: fine)").matches && !prefersReducedMotion();
    let off = () => {};
    if (fine) {
      const cx = gsap.quickTo("#cur", "x", { duration: 0.25 }), cy = gsap.quickTo("#cur", "y", { duration: 0.25 });
      const move = (e: MouseEvent) => {
        cx(e.clientX); cy(e.clientY);
        const t = e.target as Element;
        document.getElementById("cur")?.classList.toggle("big", !!t.closest(".card,.next"));
        const b = t.closest<HTMLElement>(".btn");
        if (b) { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power3" }); }
        const c = t.closest<HTMLElement>(".cover");
        if (c) { const r = c.getBoundingClientRect(); gsap.to(c, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8, duration: 0.4 }); }
      };
      const out = (e: MouseEvent) => {
        const t = e.target as Element;
        const b = t.closest<HTMLElement>(".btn"); if (b) gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.5)" });
        const c = t.closest<HTMLElement>(".cover"); if (c) gsap.to(c, { rotationX: 0, rotationY: 0, duration: 0.6 });
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseout", out);
      off = () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseout", out); };
    }
    return () => { document.removeEventListener("click", onClick, true); off(); bar.scrollTrigger?.kill(); bar.kill(); };
  }, [router]);

  // new route => recalc scroll triggers
  useEffect(() => { ScrollTrigger.refresh(); }, [path]);

  return (
    <>
      <div id="bar" /><div id="cur" /><div id="wipe" />
      <header className="nav">
        <Link className="logo" href="/" aria-label="Home">sungkom<i>.</i></Link>
        <nav>
          <Link href="/#about">About</Link>
          <Link href="/works" className={path.startsWith("/works") ? "on" : ""}>Works</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact" className="hire">Hire me ↗</Link>
        </nav>
      </header>
    </>
  );
}
