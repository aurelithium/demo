import { COMPANY } from "@/data/content";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Eyebrow, Icon, LinkButton, Reveal } from "@/components/ui";

const CARDS = [
  {
    icon: "phone",
    label: "Телефон",
    value: COMPANY.phone,
    href: COMPANY.phoneHref,
    note: "Звонок и сообщения",
  },
  {
    icon: "mail",
    label: "E-mail",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    note: "Для писем и файлов проекта",
  },
  {
    icon: "pin",
    label: "Адрес",
    value: COMPANY.address,
    note: "Выезд на объект — по договорённости",
  },
  {
    icon: "calendar",
    label: "График работы",
    value: "пн–сб · 09:00–20:00",
    note: "Воскресенье — выходной",
  },
];

const FACTS = [
  "Минимальная площадь дома — 70 м²",
  "Минимальная сумма заказа — 300 000 ₽",
  "Срок реализации — 30 дней",
  "Мастеров на объекте — 2–4 человека",
  "Оплата поэтапная, без предоплаты",
  "С ипотекой не работаю",
];

export function Contacts() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь со мной напрямую"
        text="Отвечаю лично, без call-центра. Рабочее время — пн–сб с 09:00 до 20:00. Консультация по вашему объекту бесплатна и ни к чему не обязывает."
        breadcrumbs={[{ label: "Главная", path: "/" }, { label: "Контакты" }]}
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.label} delay={i * 70}>
              <div className="h-full rounded-2xl border border-forest/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest/5 text-timber">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <p className="label-caps mt-5 text-forest/45">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="link-underline mt-2.5 block text-[1.05rem] leading-snug font-semibold break-words text-forest transition-colors hover:text-timber"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2.5 text-[1.05rem] leading-snug font-semibold text-forest">
                    {card.value}
                  </p>
                )}
                <p className="mt-3 text-[0.82rem] leading-relaxed text-forest/55">
                  {card.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------- ФОРМА И ЗОНА РАБОТ ---------------------- */}
      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow>Зона работы</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-forest sm:text-5xl">
              {COMPANY.addressShort} и Московская область
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-forest/70">
              Базовый адрес — село Пешково городского округа Чехов. Выезжаю на объекты
              в пределах района и Московской области; условия выезда и логистики
              обсуждаем индивидуально.
            </p>

            {/* стилизованная карта */}
            <div className="grain relative mt-9 h-72 overflow-hidden rounded-3xl bg-forest sm:h-80">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(248,245,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(248,245,238,0.07) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 62% 45%, rgba(220,169,98,0.22), transparent 55%)",
                }}
              />
              <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-amber text-forest shadow-lift">
                  <Icon name="pin" className="h-6 w-6" />
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber/40" />
                </span>
                <span className="mt-3 block text-[0.8rem] font-semibold text-bone">
                  с. Пешково
                </span>
              </div>
              <div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-bone/15 bg-night/60 px-5 py-4 backdrop-blur-sm">
                <p className="label-caps text-amber">Адрес</p>
                <p className="mt-1.5 text-[0.92rem] text-bone/85">{COMPANY.address}</p>
              </div>
            </div>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {FACTS.map((fact) => (
                <li key={fact} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine/12 text-pine">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.92rem] leading-relaxed text-forest/75">
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <LeadForm
            title="Написать сообщение"
            subtitle="Заполните форму — отвечу в рабочее время. Либо позвоните по номеру выше."
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grain relative overflow-hidden rounded-3xl bg-forest p-8 sm:p-12">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight font-semibold text-bone sm:text-[2.6rem]">
                Нужен документ или шаблон договора?
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-bone/70">
                Шаблоны договора подряда, расписки и акта приёмки — в разделе
                «Документы». Можно скачать и ознакомиться до начала работ.
              </p>
            </div>
            <LinkButton to="/documents" size="lg">
              Открыть документы
              <Icon name="arrow" className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
