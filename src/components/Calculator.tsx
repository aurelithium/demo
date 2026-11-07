import { useMemo, useState } from "react";
import {
  FOUNDATION_OPTIONS,
  ROOF_OPTIONS,
} from "@/data/content";
import { formatMoney } from "@/lib/store";
import { Icon } from "./ui";

const BASE_RATE = 52000; // ₽ за м² — каркасный дом под ключ (ориентир)
const TERRACE = 300000;

export function Calculator({ onRequest }: { onRequest: () => void }) {
  const [area, setArea] = useState(120);
  const [foundation, setFoundation] = useState(FOUNDATION_OPTIONS[0].id);
  const [roof, setRoof] = useState(ROOF_OPTIONS[0].id);
  const [withTerrace, setWithTerrace] = useState(false);

  const result = useMemo(() => {
    const f = FOUNDATION_OPTIONS.find((o) => o.id === foundation) ?? FOUNDATION_OPTIONS[0];
    const r = ROOF_OPTIONS.find((o) => o.id === roof) ?? ROOF_OPTIONS[0];
    const total =
      area * (BASE_RATE + f.price + r.price) + (withTerrace ? TERRACE : 0);
    const min = Math.round((total * 0.92) / 10000) * 10000;
    const max = Math.round((total * 1.12) / 10000) * 10000;
    return { min, max };
  }, [area, foundation, roof, withTerrace]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
      <div>
        <div>
          <div className="flex items-end justify-between gap-4">
            <label
              htmlFor="calc-area"
              className="label-caps text-bone/55"
            >
              Площадь дома
            </label>
            <output
              htmlFor="calc-area"
              className="font-display text-4xl font-semibold text-amber"
            >
              {area} м²
            </output>
          </div>
          <input
            id="calc-area"
            type="range"
            min={70}
            max={400}
            step={5}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="mt-5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-bone/20 accent-amber"
            style={{ accentColor: "#dca962" }}
          />
          <div className="mt-2 flex justify-between text-[0.72rem] text-bone/40">
            <span>70 м² — минимум</span>
            <span>400 м²</span>
          </div>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          <div>
            <span className="label-caps mb-3 block text-bone/55">Фундамент</span>
            <div className="space-y-2">
              {FOUNDATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFoundation(option.id)}
                  aria-pressed={foundation === option.id}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-[0.85rem] transition-all duration-300 ${
                    foundation === option.id
                      ? "border-amber bg-amber/15 text-bone"
                      : "border-bone/15 text-bone/65 hover:border-bone/40"
                  }`}
                >
                  {option.label}
                  {foundation === option.id && (
                    <Icon name="check" className="h-4 w-4 text-amber" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="label-caps mb-3 block text-bone/55">Кровля</span>
            <div className="space-y-2">
              {ROOF_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRoof(option.id)}
                  aria-pressed={roof === option.id}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-[0.85rem] transition-all duration-300 ${
                    roof === option.id
                      ? "border-amber bg-amber/15 text-bone"
                      : "border-bone/15 text-bone/65 hover:border-bone/40"
                  }`}
                >
                  {option.label}
                  {roof === option.id && (
                    <Icon name="check" className="h-4 w-4 text-amber" />
                  )}
                </button>
              ))}
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-[0.85rem] text-bone/70">
              <input
                type="checkbox"
                checked={withTerrace}
                onChange={(e) => setWithTerrace(e.target.checked)}
                className="h-5 w-5 cursor-pointer rounded border-bone/30 accent-amber"
              />
              Терраса (+300 000 ₽)
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-bone/15 bg-forest/60 p-8 backdrop-blur-sm">
        <p className="label-caps text-bone/55">Предварительная оценка</p>
        <p className="mt-5 font-display text-4xl leading-none font-semibold text-bone sm:text-[2.9rem]">
          {formatMoney(result.min)} ₽
        </p>
        <p className="mt-2 text-[0.85rem] text-bone/50">
          до {formatMoney(result.max)} ₽ в зависимости от проекта и участка
        </p>

        <dl className="mt-8 space-y-3.5 border-t border-bone/12 pt-7 text-[0.88rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-bone/55">Площадь</dt>
            <dd className="font-semibold text-bone">{area} м²</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-bone/55">Срок реализации</dt>
            <dd className="font-semibold text-bone">≈ 30 дней</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-bone/55">Оплата</dt>
            <dd className="font-semibold text-bone">по этапам, без предоплаты</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-bone/55">Минимальный заказ</dt>
            <dd className="font-semibold text-bone">300 000 ₽</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onRequest}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-7 py-4 text-[0.9rem] font-semibold text-forest transition-all duration-300 hover:bg-bone active:scale-[0.98]"
        >
          Получить точный расчёт
          <Icon name="arrow" className="h-4 w-4" />
        </button>
        <p className="mt-4 text-[0.7rem] leading-relaxed text-bone/40">
          Оценка носит информационный характер и не является публичной офертой.
          Окончательная стоимость работ определяется договором и сметой после осмотра
          участка.
        </p>
      </div>
    </div>
  );
}
