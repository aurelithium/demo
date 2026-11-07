import { COMPANY, SERVICES } from "@/data/content";
import { Logo } from "./Logo";
import { Icon } from "./ui";

const LEGAL = [
  { path: "/privacy", label: "Политика конфиденциальности" },
  { path: "/terms", label: "Пользовательское соглашение" },
  { path: "/consent", label: "Согласие на обработку персональных данных" },
  { path: "/cookies", label: "Использование cookie" },
  { path: "/documents", label: "Шаблоны документов" },
];

export function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer className="grain relative overflow-hidden bg-forest text-bone">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pt-16 pb-8 sm:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-bone/60">
              Индивидуальное строительство в {COMPANY.addressShort}. Каркасные дома под
              ключ от 70 м², срок реализации — 30 дней. Опыт более 10 лет, работа без
              предоплаты, поээтапная оплата, договор и гарантия.
            </p>
            <button
              type="button"
              onClick={onOpenModal}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-bone/25 px-6 py-3 text-[0.82rem] font-semibold text-bone transition-all duration-300 hover:border-amber hover:bg-amber hover:text-forest"
            >
              Обсудить проект
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>

          <nav aria-label="Навигация в подвале">
            <h3 className="label-caps text-amber">Навигация</h3>
            <ul className="mt-6 space-y-3.5 text-[0.9rem]">
              {[
                { path: "/", label: "Главная" },
                { path: "/services", label: "Услуги и цены" },
                { path: "/about", label: "О мастере" },
                { path: "/documents", label: "Документы" },
                { path: "/contacts", label: "Контакты" },
                { path: "/cabinet", label: "Личный кабинет" },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={`#${item.path}`}
                    className="link-underline text-bone/65 transition-colors hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="label-caps text-amber">Услуги</h3>
            <ul className="mt-6 space-y-3.5 text-[0.9rem]">
              {SERVICES.flatMap((g) => g.items)
                .slice(0, 6)
                .map((item) => (
                  <li key={item.title}>
                    <a
                      href="#/services"
                      className="link-underline text-bone/65 transition-colors hover:text-bone"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps text-amber">Контакты</h3>
            <ul className="mt-6 space-y-4 text-[0.9rem]">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="link-underline block text-lg font-semibold text-bone transition-colors hover:text-amber"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="link-underline block text-bone/65 transition-colors hover:text-bone"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3 text-bone/60">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                {COMPANY.address}
              </li>
              <li className="flex gap-3 text-bone/60">
                <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                {COMPANY.scheduleFull}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-bone/12 pt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.78rem] text-bone/45">
            {LEGAL.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className="transition-colors hover:text-amber"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-[0.75rem] text-bone/35 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 {COMPANY.brand}. Все права защищены. Оператор персональных данных
              обрабатывает данные в соответствии с № 152-ФЗ.
            </p>
            <p>Информация на сайте не является публичной офертой.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
