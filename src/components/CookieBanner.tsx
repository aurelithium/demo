import { useEffect, useState } from "react";
import { storage } from "@/lib/store";
import { Button } from "./ui";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<"all" | "essential" | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(storage.getConsent() === null);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = (value: "all" | "essential") => {
    storage.setConsent(value);
    setChoice(value);
    window.setTimeout(() => setVisible(false), 400);
  };

  if (!visible && !choice) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      className={`fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 transition-all duration-500 sm:px-6 sm:pb-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="grain relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-forest/10 bg-bone p-6 shadow-lift sm:p-7">
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="label-caps text-timber">Cookie и 152-ФЗ</p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-forest/70">
              Сайт использует файлы cookie и обрабатывает минимально необходимые данные
              для работы форм и авторизации. Продолжая пользоваться сайтом, вы
              соглашаетесь с{" "}
              <a
                href="#/cookies"
                className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
              >
                политикой cookie
              </a>{" "}
              и{" "}
              <a
                href="#/privacy"
                className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
              >
                политикой обработки персональных данных
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button variant="outline" size="sm" onClick={() => decide("essential")}>
              Только необходимые
            </Button>
            <Button size="sm" onClick={() => decide("all")}>
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
