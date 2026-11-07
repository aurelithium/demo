import { useNavigate } from "@/lib/router";
import { COMPANY, PAYMENT_TERMS } from "@/data/content";
import craftImg from "@/assets/wooden-house-forest.jpg";
import terraceImg from "@/assets/flat-house.jpg";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Eyebrow, Icon, LinkButton, Reveal, SectionHeading } from "@/components/ui";

const TIMELINE = [
  {
    year: "2002",
    title: "Плотник 6-го разряда",
    text: "Диплом по профессии «плотник 6-го разряда» — универсал, бригадир. ПТУ-44, город Тольятти.",
  },
  {
    year: "2002–2016",
    title: "Практика на объектах",
    text: "Работа в строительных бригадах: каркасные и деревянные конструкции, кровли, отделка. Перевод из «мастера» в «бригадира».",
  },
  {
    year: "2016 — н.в.",
    title: "Индивидуальное строительство",
    text: "Собственная практика в Московской области: каркасные дома под ключ, поэтапная оплата без предоплаты.",
  },
  {
    year: "Сегодня",
    title: "Технологическая карта + архитектор",
    text: "Собственный регламент работ, разработанный совместно с архитектором на базе моего 10-летнего опыта.",
  },
];

const PRINCIPLES = [
  {
    title: "Без предоплаты",
    text: "Работаю без аванса. Оплата — раз в неделю за принятый объём, обычно по субботам.",
  },
  {
    title: "Материалы по себестоимости",
    text: "Закупаю напрямую у поставщиков, без наценки. Доставку оплачиваете по факту приёмки на участке.",
  },
  {
    title: "Технология важнее скорости",
    text: "Своя технологическая карта: каждый узел и этап выполняются по регламенту, а не «на глаз».",
  },
  {
    title: "Знаю, умею, люблю",
    text: "Дерево, каркас, кровля и коммуникации — моя профессия больше двух десятилетий.",
  },
];

export function About() {
  const navigate = useNavigate();

  return (
    <>
      <PageHero
        eyebrow="О мастере"
        title="Плотник 6-го разряда с опытом 10+ лет"
        text="Индивидуальное строительство в селе Пешково и по Московской области. Каркасные дома под ключ от 70 м², срок реализации — 30 дней, работа без предоплаты и с полным пакетом документов."
        breadcrumbs={[{ label: "Главная", path: "/" }, { label: "О мастере" }]}
      />

      {/* ------------------------------ ИСТОРИЯ --------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Путь</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-forest sm:text-5xl">
              От ПТУ в Тольятти до собственной технологии
            </h2>
            <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-forest/70">
              <p>
                В 2002 году получил профессию плотника 6-го разряда — универсала и
                бригадира. Дальше — годы работы на объектах: каркас, кровли, деревянные
                конструкции, бригада и ответственность за результат.
              </p>
              <p>
                Сейчас занимаюсь индивидуальным строительством: каркасные дома под
                ключ, газобетон и пеноблоки по согласованию. За 10 с лишним лет
                сложилась собственная технологическая карта, разработанная совместно с
                архитектором на базе моего опыта, — она задаёт порядок работ и
                контроль качества на каждом этапе.
              </p>
              <p>
                Принцип простой: заказчик не платит вперёд. Материалы беру у
                поставщиков без наценки, доставку оплачиваете по факту приёмки.
                Оформляю договор, расписки и акт — чтобы у обеих сторон была
                прозрачная и защищённая история сотрудничества.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lift sm:mt-12">
              <img
                src={craftImg}
                alt="Деревянный дом с отделанным фасадом и террасой в окружении деревьев"
                loading="lazy"
                className="h-80 w-full object-cover sm:h-[26rem]"
              />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={terraceImg}
                alt="Современный одноэтажный дом с лаконичным фасадом и панорамными окнами"
                loading="lazy"
                className="h-80 w-full object-cover sm:h-[26rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- ТАЙМЛАЙН --------------------------- */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Хронология"
            title="Опыт, который видно по результату"
          />
          <ol className="mt-14 grid gap-6 lg:grid-cols-4">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <li className="h-full list-none rounded-2xl border border-forest/10 bg-white p-7">
                  <span className="label-caps text-timber">{item.year}</span>
                  <h3 className="mt-4 text-[1.3rem] font-semibold text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.89rem] leading-relaxed text-forest/65">
                    {item.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------- ПРИНЦИПЫ ---------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Принципы"
            title="Как я работаю с заказчиком"
            text="Четыре правила, которые не меняются ни на одном объекте."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="h-full rounded-2xl border border-forest/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest/5 text-timber">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.3rem] font-semibold text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-forest/65">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ ОБРАЗОВАНИЕ / УСЛОВИЯ ------------------- */}
      <section className="grain relative overflow-hidden bg-forest py-20 lg:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow tone="dark">Образование и курсы</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-bone sm:text-5xl">
                Профильное образование и практика
              </h2>
              <ul className="mt-9 space-y-6">
                <li className="flex gap-5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  <div>
                    <h3 className="text-[1.2rem] font-semibold text-bone">
                      Плотник 6-го разряда (универсал — бригадир), 2002 г.
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] text-bone/60">
                      Профессиональное учебное заведение ПТУ-44, город Тольятти.
                    </p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  <div>
                    <h3 className="text-[1.2rem] font-semibold text-bone">
                      Технологическая карта, разработанная с архитектором
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] text-bone/60">
                      Собственный регламент работ, созданный на базе практического
                      опыта более 10 лет.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl border border-bone/15 bg-forest/60 p-7">
                <p className="label-caps text-amber">Зона работы</p>
                <p className="mt-3 flex items-start gap-3 text-[1.02rem] text-bone/85">
                  <Icon name="pin" className="mt-1 h-5 w-5 shrink-0 text-amber" />
                  {COMPANY.address}
                </p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-bone/60">
                  Выезд на объект и консультации — по договорённости. Проживание на
                  объекте возможно по согласованию с заказчиком.
                </p>
              </div>
            </div>

            <div>
              <Eyebrow tone="dark">Условия</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-bone sm:text-5xl">
                Коротко о правилах
              </h2>
              <dl className="mt-9 divide-y divide-bone/12 border-y border-bone/12">
                {PAYMENT_TERMS.map((term) => (
                  <div
                    key={term.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-4"
                  >
                    <dt className="text-[0.9rem] text-bone/55">{term.label}</dt>
                    <dd className="font-semibold text-bone">{term.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 text-[0.85rem] leading-relaxed text-bone/45">
                Подробнее о каждом пункте — на странице «Услуги и цены» и в разделе
                «Документы», где выложены шаблоны договора, расписки и акта.
              </p>
              <LinkButton
                to="/documents"
                className="mt-8"
                onClick={() => navigate("/documents")}
              >
                Смотреть шаблоны документов
                <Icon name="arrow" className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Связаться"
            title="Давайте обсудим ваш дом"
            text="Напишите или позвоните — отвечу лично, без call-центра и скриптов."
          />
          <LeadForm
            title="Написать мастеру"
            subtitle="Опишите задачу: площадь, участок, сроки. Отвечу в рабочее время."
          />
        </div>
      </section>
    </>
  );
}
