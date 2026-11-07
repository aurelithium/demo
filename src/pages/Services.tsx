import { useNavigate } from "@/lib/router";
import { PAYMENT_TERMS, SERVICES, TECH_SPECS } from "@/data/content";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Eyebrow, Icon, LinkButton, Reveal, SectionHeading } from "@/components/ui";

export function Services() {
  const navigate = useNavigate();

  return (
    <>
      <PageHero
        eyebrow="Услуги и цены"
        title="Строительство домов и всё, что вокруг"
        text="Каркасные дома под ключ — основное направление. Также выполняю работы по газобетону и пеноблокам, проектирование, черновую отделку и террасы. По большинству позиций цена договорная: итог зависит от проекта, участка и состава работ."
        breadcrumbs={[{ label: "Главная", path: "/" }, { label: "Услуги и цены" }]}
      />

      {/* ------------------------------ ПРАЙС ----------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Прайс"
          title="Стоимость работ"
          text="Ниже — актуальные позиции и форматы pricing. Точная смета формируется после осмотра участка и согласования проекта."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 90}>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-soft">
                <div className="border-b border-forest/8 bg-sand/60 px-7 py-5">
                  <h3 className="label-caps text-timber">{group.group}</h3>
                </div>
                <ul className="flex-1 divide-y divide-forest/8 px-7">
                  {group.items.map((item) => (
                    <li key={item.title} className="py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-[1.1rem] font-semibold text-forest">
                          {item.title}
                        </h4>
                        <span className="font-display text-2xl font-semibold text-timber">
                          {item.price}
                        </span>
                      </div>
                      {item.note && (
                        <p className="mt-2 text-[0.86rem] leading-relaxed text-forest/60">
                          {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[0.8rem] leading-relaxed text-forest/50">
          * Указаны ориентировочные единицы измерения. Окончательная стоимость,
          объём и состав работ определяются договором и сметой. Цены не являются
          публичной офертой. Минимальная сумма заказа — 300 000 ₽, минимальная
          площадь дома — 70 м².
        </p>
      </section>

      {/* --------------------------- ЧТО ВКЛЮЧАЕТ -------------------------- */}
      <section className="grain relative overflow-hidden bg-forest py-20 lg:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <Eyebrow tone="dark">Состав работ</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-bone sm:text-5xl">
              Технологии, материалы и коммуникации
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-bone/70">
              Дом под ключ: каркас, фундамент, фасад, кровля, инженерные системы и
              окна. Внутренняя отделка — без отделки; черновая отделка
              подключается опционально.
            </p>
          </div>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-bone/15 bg-bone/12 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_SPECS.map((spec) => (
              <div key={spec.label} className="bg-forest/70 p-7">
                <dt className="flex items-center gap-3 text-[0.8rem] font-semibold tracking-wide text-bone/50 uppercase">
                  <Icon name={spec.icon} className="h-4 w-4 text-amber" />
                  {spec.label}
                </dt>
                <dd className="mt-4 text-[1.05rem] leading-relaxed text-bone">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------- УСЛОВИЯ ----------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Условия работы</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-forest sm:text-5xl">
              Договор, поэтапная оплата, гарантия
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-forest/70">
              Работаю по договору подряда. Предоплаты нет: оплата производится за
              фактически принятый объём, на каждую сумму выдаётся расписка, по
              завершении подписывается акт приёмки.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LinkButton to="/documents" onClick={() => navigate("/documents")}>
                Шаблоны документов
                <Icon name="arrow" className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/about" variant="outline" onClick={() => navigate("/about")}>
                О мастере
              </LinkButton>
            </div>
          </div>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {PAYMENT_TERMS.map((term) => (
              <div
                key={term.label}
                className="border-b border-forest/10 pb-5 sm:border-b-0 sm:pb-0"
              >
                <dt className="label-caps text-forest/45">{term.label}</dt>
                <dd className="mt-2.5 font-display text-2xl font-semibold text-forest">
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Запрос стоимости"
              title="Пришлите параметры дома — вернусь со сметой"
              text="Укажите площадь, участок и пожелания по фундаменту и кровле. Рассчитаю стоимость и назову реалистичный срок."
            />
          </div>
          <LeadForm
            title="Запросить смету"
            subtitle="Ответим в рабочее время: пн–сб, 09:00–20:00. Консультация бесплатна."
          />
        </div>
      </section>
    </>
  );
}
