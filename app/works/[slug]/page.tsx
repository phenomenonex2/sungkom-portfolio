import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "../../../components/ProjectView";
import { PROJECTS } from "../../../lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find(x => x.slug === slug);
  return { title: p ? `${p.name} — Sungkom Wongussapaiboon` : "Project", description: p?.desc };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const i = PROJECTS.findIndex(x => x.slug === slug);
  if (i < 0) notFound();
  return <ProjectView p={PROJECTS[i]} next={PROJECTS[(i + 1) % PROJECTS.length]} />;
}
