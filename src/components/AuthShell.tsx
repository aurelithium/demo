import type { ReactNode } from "react";
import { COMPANY } from "@/data/content";
import { Logo } from "./Logo";
import { Icon } from "./ui";

const BENEFITS = [
  {
    icon: "calendar",
    title: "Заявки и статусы",
    text: "Оставляйте обращения по проекту и следите за их статусом в одном месте.",
  },
  {
    icon: "document",
    title: "Документы под рукой",
    text: "Шаблоны договора, расписки и акта приёмки — всегда доступны в кабинете.",
  },
  {
    icon: "shield",
    title: "Данные под защитой",
    text: "Обработка персональных данных ведётся в соответствии с № 152-ФЗ. Передача третьим лицам не осуществляется.",
  },
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-forest pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(220,169,98,0.5), transparent 65%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Logo tone="dark" />
            <h1 className="mt-10 text-[2.6rem] leading-[1.05] font-semibold text-bone sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-bone/70">
              {subtitle}
            </p>

            <ul className="mt-11 space-y-6">
              {BENEFITS.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bone/8 text-amber">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-[1.1rem] font-semibold text-bone">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 max-w-md text-[0.9rem] leading-relaxed text-bone/60">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-11 max-w-md text-[0.78rem] leading-relaxed text-bone/40">
              {COMPANY.brand} · {COMPANY.tagline}. Оператор персональных данных
              обрабатывает данные аккаунта исключительно для ответов на обращения и
              организации работ.
            </p>
          </div>

          <div className="rounded-3xl bg-bone p-7 shadow-lift sm:p-9">
            {children}
            {footer && <div className="mt-7">{footer}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
