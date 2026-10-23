import type { Project } from "../lib/data";

export default function Cover({ p }: { p: Project }) {
  if (p.img) return <img src={p.img} alt={p.name} loading="lazy" />;
  return (
    <div className="ph" style={{ background: `linear-gradient(135deg,hsl(${p.hue} 70% 38%),hsl(${(p.hue + 50) % 360} 60% 14%))` }}>
      {p.name[0]}
    </div>
  );
}
