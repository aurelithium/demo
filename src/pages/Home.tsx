import { useNavigate } from "@/lib/router";
import {
  ADVANTAGES,
  COMPANY,
  FAQ,
  HERO_STATS,
  PAYMENT_TERMS,
  PROCESS,
  SERVICES,
  TECH_SPECS,
} from "@/data/content";
import heroImg from "@/assets/wooden-house-snow.jpg";
import craftImg from "@/assets/white-house-facade.jpg";
import frameImg from "@/assets/frame-construction.jpg";
import terraceImg from "@/assets/house-porch.jpg";
import projectGable from "@/assets/project-gable-progress.jpg";
import brickFacade from "@/assets/brick-facade.jpg";
import interiorWindows from "@/assets/interior-windows.jpg";
import interiorReception from "@/assets/interior-reception.jpg";
import interiorLounge from "@/assets/interior-lounge.jpg";
import woodenForest from "@/assets/wooden-house-forest.jpg";
import interiorHall from "@/assets/interior-hall.jpg";
import flatHouse from "@/assets/flat-house.jpg";
import compactHouse from "@/assets/compact-house.jpg";
import interiorGlazing from "@/assets/interior-glazing.jpg";
import { Calculator } from "@/components/Calculator";
import { LeadForm } from "@/components/LeadForm";
import {
  Accordion,
  Eyebrow,
  Icon,
  LinkButton,
  Reveal,
  SectionHeading,
} from "@/components/ui";

const MARQUEE = [
  "Каркасные дома",
  "Дом под ключ",
  "Без предоплаты",
  "Срок 30 дней",
  "Опыт 10+ лет",
  "Договор · расписка · акт",
  "Материалы без наценки",
  "Гарантия на работу",
];

export function Home({ onOpenModal }: { onOpenModal: () => void }) {
  const navigate = useNavigate();

  return (
    <>
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="grain relative min-h-[92vh] overflow-hidden bg-forest pt-32 pb-14 sm:pt-40 lg:min-h-[100vh] lg:pt-48">
        <img
          src={heroImg}
          alt="Готовый деревянный каркасный дом с панорамными окнами и террасой зимой"
          className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-55"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(8,18,13,0.94) 0%, rgba(13,33,23,0.82) 42%, rgba(13,33,23,0.35) 78%, rgba(8,18,13,0.6) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1280px] flex-col justify-end px-5 sm:px-8">
          <Reveal>
            <Eyebrow tone="dark">Индивидуальное строительство · {COMPANY.addressShort}</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-7 max-w-4xl text-[2.9rem] leading-[1.02] font-semibold text-bone sm:text-6xl lg:text-[5rem]">
              Каркасные дома
              <span className="block text-amber">под ключ за 30 дней</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-bone/75">
              Строю дома от 70 м² в {COMPANY.addressShort} и Московской области. Без
              предоплаты, с поээтапной оплатой за принятый объём, материалами от
              поставщиков без наценки и полным пакетом документов.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LinkButton to="/contacts" size="lg" onClick={() => navigate("/contacts")}>
                Обсудить проект
                <Icon name="arrow" className="h-4 w-4" />
              </LinkButton>
              <LinkButton
                to="/services"
                size="lg"
                variant="outline"
                className="border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-forest"
                onClick={() => navigate("/services")}
              >
                Услуги и цены
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-bone/15 pt-9 sm:grid-cols-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display text-4xl font-semibold text-bone sm:text-5xl">
                      {stat.value}
                    </span>
                    <span className="ml-2 text-sm text-amber">{stat.unit}</span>
                    <span className="mt-2 block text-[0.8rem] leading-snug text-bone/55">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- MARQUEE ----------------------------- */}
      <div className="overflow-hidden bg-timber py-4 text-white">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-[0.78rem] font-semibold tracking-[0.18em] uppercase">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>

      {/* --------------------------- ПРЕИМУЩЕСТВА -------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Почему со мной"
            title="Строю так, как хотел бы дом для себя"
            text="Десять лет практики, собственная технологическая карта и принцип: заказчик платит только за принятую работу. Никаких авансов, скрытых наценок и «сюрпризов» по ходу стройки."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {ADVANTAGES.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="group h-full rounded-2xl border border-forest/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-timber/40 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest/5 text-timber transition-colors duration-500 group-hover:bg-timber group-hover:text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.35rem] font-semibold text-forest">
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

      {/* ----------------------- ДОМ ПОД КЛЮЧ / СПЕК ---------------------- */}
      <section className="grain relative overflow-hidden bg-sand py-20 lg:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Дом под ключ"
                title="Что входит в работу"
                text="Полный цикл: от фундамента до кровли и коммуникаций. Технология — каркасный дом; внутренняя отделка по умолчанию без отделки, черновая — опционально."
              />
              <dl className="mt-10 divide-y divide-forest/10 border-t border-forest/10">
                {TECH_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="flex w-52 shrink-0 items-center gap-2.5 text-[0.82rem] font-semibold text-forest/55">
                      <Icon name={spec.icon} className="h-4 w-4 text-timber" />
                      {spec.label}
                    </dt>
                    <dd className="text-[0.95rem] leading-relaxed text-forest">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img
                  src={frameImg}
                  alt="Монтаж деревянного каркаса дома и стропильной системы на объекте"
                  loading="lazy"
                  className="h-[26rem] w-full object-cover lg:h-[36rem]"
                />
              </div>
              <div className="mt-5 overflow-hidden rounded-3xl bg-forest p-7 text-bone sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:max-w-xs">
                <p className="label-caps text-amber">Технологическая карта</p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-bone/75">
                  Собственный регламент работ, разработанный совместно с архитектором:
                  порядок этапов, узлы и контроль качества на каждой стадии.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------- НАШИ ОБЪЕКТЫ -------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Реальные объекты"
          title="Дома и пространства, которые мы создаём"
          text="Фотографии строительных этапов, готовых фасадов и интерьеров с наших объектов. Показываем не рендеры, а реальные результаты работ."
        />
        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-3">
          {[
            { src: projectGable, alt: "Дом с двускатной крышей на этапе строительства", title: "Строительство дома" },
            { src: frameImg, alt: "Деревянный каркас и стропильная система", title: "Монтаж каркаса" },
            { src: brickFacade, alt: "Одноэтажный дом с фасадом под кирпич", title: "Фасадные решения" },
            { src: interiorWindows, alt: "Интерьер с высокими окнами и панорамным остеклением", title: "Внутренняя отделка" },
            { src: interiorReception, alt: "Современная стойка ресепшен с деревянной отделкой и подсветкой", title: "Коммерческие интерьеры" },
            { src: interiorLounge, alt: "Зона отдыха с деревянным потолком и панорамными окнами", title: "Интерьер и отделка" },
            { src: heroImg, alt: "Готовый деревянный дом с панорамным остеклением зимой", title: "Готовый дом" },
            { src: woodenForest, alt: "Деревянный дом с террасой в окружении деревьев", title: "Деревянный дом" },
            { src: terraceImg, alt: "Двухэтажный дом с большой крытой верандой", title: "Дом с верандой" },
            { src: interiorHall, alt: "Просторный интерьер с деревянной стойкой и освещением", title: "Отделка помещений" },
            { src: flatHouse, alt: "Современный одноэтажный дом с плоской крышей", title: "Современная архитектура" },
            { src: compactHouse, alt: "Компактный дом с панорамным остеклением", title: "Компактные дома" },
            { src: craftImg, alt: "Светлый фасад дома с контрастными оконными рамами", title: "Фасад дома" },
            { src: interiorGlazing, alt: "Интерьер с панорамным остеклением и деревянной отделкой", title: "Панорамное остекление" },
          ].map((photo, i) => (
            <Reveal key={`${photo.title}-${i}`} delay={(i % 3) * 60}>
              <figure className={`group relative h-full overflow-hidden rounded-2xl bg-sand shadow-soft ${i === 0 || i === 4 || i === 10 ? "sm:row-span-2" : ""}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold tracking-wide text-white">{photo.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ ПРОЦЕСС --------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Пять этапов от заявки до гарантии"
          text="Прозрачный процесс без предоплаты: каждый этап согласуется, оплачивается по факту и подтверждается документами."
        />
        <ol className="mt-14 grid gap-6 lg:grid-cols-5">
          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={i * 80}>
              <li className="group relative h-full list-none">
                <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-6 transition-all duration-500 hover:border-timber/40 hover:shadow-lift">
                  <span className="font-display text-5xl font-semibold text-forest/15 transition-colors duration-500 group-hover:text-timber/40">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-[1.25rem] font-semibold text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-forest/65">
                    {step.text}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ----------------------------- ОПЛАТА ----------------------------- */}
      <section className="grain relative overflow-hidden bg-forest py-20 lg:py-28">
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(47,107,76,0.8), transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow tone="dark">Оплата и гарантии</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-bone sm:text-5xl">
                Без предоплаты. Платите за сделанное
              </h2>
              <blockquote className="mt-8 border-l-2 border-amber pl-6">
                <p className="font-display text-[1.5rem] leading-snug text-bone/90 italic sm:text-[1.75rem]">
                  «Простыми словами: сумма за работу 500 000 ₽, строить буду 4 недели —
                  раз в неделю (обычно в субботу) оплата по 125 000 ₽ уже за выполненную
                  работу на 125 000 ₽.»
                </p>
              </blockquote>
              <p className="mt-8 max-w-xl text-[0.98rem] leading-relaxed text-bone/70">
                Материалы закупаю напрямую у поставщиков и передаю без наценки. Доставка
                материалов оплачивается по факту доставки и приёмки по качеству и
                количеству у вас на участке — это максимально безопасно для заказчика.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <LinkButton to="/about" variant="primary" onClick={() => navigate("/about")}>
                  О мастере и подходе
                </LinkButton>
                <LinkButton
                  to="/documents"
                  variant="outline"
                  className="border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-forest"
                  onClick={() => navigate("/documents")}
                >
                  Шаблоны документов
                </LinkButton>
              </div>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-bone/15 bg-bone/12 sm:grid-cols-2">
              {PAYMENT_TERMS.map((term) => (
                <div key={term.label} className="bg-forest/70 p-6 backdrop-blur-sm">
                  <dt className="label-caps text-bone/45">{term.label}</dt>
                  <dd className="mt-3 font-display text-2xl font-semibold text-bone">
                    {term.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------- КАЛЬКУЛЯТОР ------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Предварительный расчёт"
          title="Ориентир по стоимости за 30 секунд"
          text="Выберите площадь, фундамент и кровлю — покажу диапазон. Точная цена определяется договором и сметой после осмотра участка."
        />
        <Reveal delay={120}>
          <div className="mt-14 rounded-3xl bg-forest p-7 sm:p-10 lg:p-12">
            <Calculator onRequest={onOpenModal} />
          </div>
        </Reveal>
      </section>

      {/* ----------------------------- УСЛУГИ ----------------------------- */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Услуги и цены"
              title="Основные направления и стоимость"
              text="Полный прайс с единицами измерения — на странице услуг. По большинству позиций цена договорная: она зависит от проекта, участка и состава работ."
            />
            <LinkButton to="/services" variant="dark" onClick={() => navigate("/services")}>
              Все услуги и цены
              <Icon name="arrow" className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-forest/10 bg-white p-7">
                  <h3 className="label-caps text-timber">{group.group}</h3>
                  <ul className="mt-6 flex-1 divide-y divide-forest/8">
                    {group.items.map((item) => (
                      <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[1.02rem] font-semibold text-forest">
                            {item.title}
                          </span>
                          <span className="shrink-0 font-display text-xl font-semibold text-timber">
                            {item.price}
                          </span>
                        </div>
                        {item.note && (
                          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-forest/55">
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
        </div>
      </section>

      {/* ---------------------------- О МАСТЕРЕ --------------------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="О мастере"
              title="Плотник 6-го разряда. Опыт 10+ лет"
              text="ПТУ-44, город Тольятти, 2002 год. С тех пор — стройка, дерево и ответственность за результат. Знаю, умею и люблю свою работу: работаю без предоплаты, держу технологию и гарантию."
            />
            <ul className="mt-9 space-y-4">
              {[
                "Бригадир-универсал: 2–4 мастера на объекте",
                "Собственная технологическая карта, разработанная с архитектором",
                "Материалы напрямую от поставщиков, без наценки",
                "Гарантия на работу и договорной подход к каждому этапу",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3.5">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine/12 text-pine">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.97rem] leading-relaxed text-forest/75">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <LinkButton to="/about" variant="dark" className="mt-10" onClick={() => navigate("/about")}>
              Подробнее о мастере
              <Icon name="arrow" className="h-4 w-4" />
            </LinkButton>
          </div>
          <div className="order-1 grid gap-5 sm:grid-cols-2 lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-lift sm:mt-10">
              <img
                src={craftImg}
                alt="Готовый фасад каркасного дома со светлой отделкой"
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={terraceImg}
                alt="Деревянная терраса и фасад готового дома среди деревьев"
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Вопросы и ответы"
              title="Частые вопросы"
              text="Если нужного вопроса нет — напишите в форме или позвоните, отвечу лично."
            />
            <Reveal>
              <Accordion items={FAQ} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Начать строительство</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.06] font-semibold text-forest sm:text-5xl">
              Расскажите о вашем участке — назову сроки и стоимость
            </h2>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-forest/70">
              Консультация бесплатна и ни к чему не обязывает. Работаю в{" "}
              {COMPANY.addressShort} и по Московской области, пн–сб с 09:00 до 20:00.
            </p>
            <div className="mt-9 space-y-4">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-4 text-xl font-semibold text-forest transition-colors hover:text-timber"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-amber">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-4 text-[1.02rem] text-forest/75 transition-colors hover:text-timber"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-amber">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                {COMPANY.email}
              </a>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
