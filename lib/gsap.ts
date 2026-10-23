import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch {} },
};

/** Fade-up on scroll for every element matching `sel` inside `scope`. */
export function reveal(scope: Element, sel: string, vars: gsap.TweenVars = {}) {
  scope.querySelectorAll(sel).forEach(el =>
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }, ...vars }));
}

export { gsap, ScrollTrigger };
