import type { ReactNode } from "react";
import { COMPANY } from "@/data/content";
import { Breadcrumbs } from "./ui";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  footer?: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="grain relative overflow-hidden bg-forest pt-32 pb-14 sm:pt-40 lg:pt-44 lg:pb-20">
        <div
          className="pointer-events-none absolute -top-40 -right-24 h-[30rem] w-[30rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(220,169,98,0.5), transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
          <Breadcrumbs
            items={[{ label: "Главная", path: "/" }, { label: eyebrow }]}
          />
          <p className="label-caps mt-8 inline-flex items-center gap-3 text-amber">
            <span className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold text-bone sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          <div className="mt-6 max-w-3xl text-[1rem] leading-relaxed text-bone/70">
            {intro}
          </div>
          <p className="mt-6 text-[0.8rem] text-bone/45">Редакция от {updated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
          {/* оглавление */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="label-caps text-forest/40">Содержание</p>
            <nav className="mt-5 space-y-2.5" aria-label="Содержание документа">
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#legal-${section.id}`}
                  className="flex gap-3 text-[0.86rem] leading-snug text-forest/60 transition-colors hover:text-timber"
                >
                  <span className="font-semibold text-forest/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 rounded-2xl border border-forest/10 bg-sand/60 p-5">
              <p className="label-caps text-timber">Оператор данных</p>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-forest/65">
                {COMPANY.operatorName}
                <br />
                {COMPANY.address}
                <br />
                <a
                  href={COMPANY.phoneHref}
                  className="font-semibold text-forest underline decoration-timber/40 underline-offset-2"
                >
                  {COMPANY.phone}
                </a>
                <br />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-semibold text-forest underline decoration-timber/40 underline-offset-2"
                >
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </aside>

          {/* текст */}
          <div className="min-w-0">
            <div className="rounded-3xl border border-forest/10 bg-white p-7 shadow-soft sm:p-10">
              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={`legal-${section.id}`}
                  className="scroll-mt-28 border-b border-forest/8 py-8 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h2 className="flex gap-4 text-[1.5rem] leading-tight font-semibold text-forest sm:text-[1.7rem]">
                    <span className="font-display text-timber/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  {(section.paragraphs ?? []).map((text) => (
                    <p
                      key={text.slice(0, 40)}
                      className="mt-4 text-[0.95rem] leading-[1.75] text-forest/75"
                    >
                      {text}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 space-y-2.5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.95rem] leading-relaxed text-forest/75"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-timber" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer}
                </section>
              ))}
            </div>

            <p className="mt-8 text-[0.78rem] leading-relaxed text-forest/45">
              Документ размещён на сайте {COMPANY.brand} ({COMPANY.phone}) и применяется
              ко всем пользователям, оставляющим персональные данные через формы
              обратной связи, регистрацию и личный кабинет.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
