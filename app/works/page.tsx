import type { Metadata } from "next";
import WorksGrid from "../../components/WorksGrid";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = { title: "Works — Sungkom Wongussapaiboon" };

export default function Works() {
  return (
    <>
      <Reveal as="section" className="p-hero" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <p className="mono">Archive 2022 — 2024</p>
          <h1 style={{ marginTop: 20 }}>All works</h1>
        </div>
      </Reveal>
      <section style={{ paddingTop: 40 }}><div className="wrap"><WorksGrid /></div></section>
    </>
  );
}
