import type { ReactNode } from "react";
import { Breadcrumbs } from "./ui";

export function PageHero({
  eyebrow,
  title,
  text,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  breadcrumbs: { label: string; path?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-forest pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(220,169,98,0.55), transparent 65%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <p className="label-caps inline-flex items-center gap-3 text-amber">
              <span className="h-px w-8 bg-current opacity-60" />
              {eyebrow}
            </p>
            <h1 className="mt-6 text-[2.7rem] leading-[1.03] font-semibold text-bone sm:text-6xl lg:text-[4.2rem]">
              {title}
            </h1>
          </div>
          <div>
            {text && (
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-bone/70">
                {text}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
