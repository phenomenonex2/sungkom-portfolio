"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "../lib/gsap";

/** Page-intro wrapper: staggers its `h1` and `.mono` children in on mount. */
export default function Reveal({ as: Tag = "div", className, style, children }:
  { as?: "div" | "section"; className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("h1, .mono", { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: "power4.out" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <Tag ref={ref as never} className={className} style={style}>{children}</Tag>;
}
