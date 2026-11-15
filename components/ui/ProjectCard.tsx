import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy to-navy-800">
        {cover ? (
          <Image src={cover} alt={`${project.title} screenshot`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-white/40">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs font-semibold uppercase tracking-widest">Screenshot pending</span>
          </div>
        )}
        {project.placeholder && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Dev placeholder</span>
        )}
      </div>
      <div className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{project.category}</p>
        <h3 className="mt-3 text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white/80">{t}</li>
          ))}
        </ul>
        {project.url && (
          <Link href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            View Project <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
