import { useState } from "react";
import { DOCUMENTS } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { Button, Icon, useToast } from "@/components/ui";
import { cn } from "@/utils/cn";

export function Documents() {
  const [active, setActive] = useState(DOCUMENTS[0].id);
  const { notify } = useToast();
  const doc = DOCUMENTS.find((d) => d.id === active) ?? DOCUMENTS[0];

  const download = () => {
    const blob = new Blob([doc.body], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify("Файл шаблона сохранён");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(doc.body);
      notify("Текст шаблона скопирован");
    } catch {
      notify("Не удалось скопировать — выделите текст вручную");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Документы"
        title="Договор, расписка, акт"
        text="Работаю по договору подряда. На каждый платёж оформляю расписку в получении денежных средств, по завершении строительства подписываем акт приёмки выполненных работ. Ниже — шаблоны, которые мы используем."
        breadcrumbs={[{ label: "Главная", path: "/" }, { label: "Документы" }]}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { icon: "document", text: "Договор подряда" },
            { icon: "wallet", text: "Расписка о получении" },
            { icon: "check", text: "Акт приёмки работ" },
          ].map((chip) => (
            <span
              key={chip.text}
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-4 py-2 text-[0.8rem] text-bone/75"
            >
              <Icon name={chip.icon} className="h-4 w-4 text-amber" />
              {chip.text}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        {/* переключатель шаблонов */}
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {DOCUMENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              aria-pressed={active === item.id}
              className={cn(
                "shrink-0 rounded-full border px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300",
                active === item.id
                  ? "border-forest bg-forest text-bone"
                  : "border-forest/15 text-forest/65 hover:border-forest/40 hover:text-forest",
              )}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div>
            <h2 className="text-3xl leading-tight font-semibold text-forest sm:text-[2.4rem]">
              {doc.title}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-forest/65">
              {doc.subtitle}
            </p>

            <div className="mt-8 space-y-3">
              <Button onClick={download} className="w-full sm:w-auto">
                <Icon name="document" className="h-4 w-4" />
                Скачать шаблон (.txt)
              </Button>
              <Button variant="outline" onClick={copy} className="w-full sm:w-auto sm:ml-3">
                Копировать текст
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-forest/10 bg-sand/70 p-6">
              <p className="label-caps text-timber">Важно</p>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-forest/65">
                Шаблоны носят информационный характер и приведены для ознакомления.
                Конкретные условия (цена, сроки, объём, гарантия) фиксируются в
                договоре, подписанном сторонами. При необходимости текст адаптируется
                под ваш объект.
              </p>
            </div>
          </div>

          {/* «Бумага» с текстом шаблона */}
          <article className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft sm:p-9">
            <div className="flex items-center justify-between gap-4 border-b border-forest/10 pb-5">
              <div>
                <p className="label-caps text-forest/40">Шаблон документа</p>
                <p className="mt-1.5 font-display text-xl font-semibold text-forest">
                  {doc.tab}
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest/5 text-timber">
                <Icon name="document" className="h-5 w-5" />
              </span>
            </div>
            <pre className="mt-6 max-h-[38rem] overflow-auto font-sans text-[0.84rem] leading-[1.75] whitespace-pre-wrap text-forest/80">
              {doc.body}
            </pre>
          </article>
        </div>
      </section>
    </>
  );
}
