import { PageHero } from "./PageHero";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} crumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <section className="section bg-deep">
        <div className="container max-w-3xl space-y-10">
          <p className="rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
            Template text — please have this reviewed by a qualified legal professional before publishing.
          </p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-bold text-white">{s.h}</h2>
              {s.p.map((p, i) => <p key={i} className="mt-4 leading-relaxed text-muted">{p}</p>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
