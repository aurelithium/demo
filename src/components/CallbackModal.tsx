import { useEffect, useRef, useState } from "react";
import { COMPANY } from "@/data/content";
import { addRequest, formatPhone, isValidPhone, uid } from "@/lib/store";
import { Icon } from "./ui";
import { Button, ConsentCheckbox, Field, Input, Textarea } from "./ui";

export function CallbackModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const timer = window.setTimeout(() => {
        dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      }, 260);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setDone(false);
        setName("");
        setPhone("");
        setMessage("");
        setConsent(false);
        setErrors({});
      }, 400);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const submit = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите, как к вам обращаться";
    if (!isValidPhone(phone)) next.phone = "Телефон в формате +7 (999) 123-45-67";
    if (!consent) next.consent = "Требуется согласие на обработку данных";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    addRequest({
      id: uid(),
      email: "guest",
      service: "Обратный звонок",
      area: "—",
      message: `${name.trim()} · ${phone}. ${message.trim()}`,
      createdAt: new Date().toISOString(),
      status: "new",
    });
    setDone(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-night/70 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Обсудить проект"
          className={`grain relative w-full max-w-lg overflow-hidden rounded-3xl bg-bone shadow-lift transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
          }`}
        >
          <div className="relative z-10 max-h-[88vh] overflow-y-auto p-7 sm:p-9">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-bone"
              aria-label="Закрыть окно"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pine text-bone">
                  <Icon name="check" className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-3xl font-semibold text-forest">Заявка принята</h3>
                <p className="mx-auto mt-4 max-w-sm text-[0.95rem] leading-relaxed text-forest/70">
                  Свяжусь с вами в рабочее время ({COMPANY.scheduleFull}) и подробно
                  расскажу об этапах, сроках и порядке оплаты.
                </p>
                <Button className="mt-8" onClick={onClose}>
                  Понятно
                </Button>
              </div>
            ) : (
              <>
                <p className="label-caps text-timber">Бесплатная консультация</p>
                <h3 className="mt-4 text-3xl leading-tight font-semibold text-forest sm:text-[2.1rem]">
                  Обсудим ваш дом
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-forest/65">
                  Расскажите о задаче — отвечу по срокам, технологии и стоимости.
                  Предоплаты не требуется.
                </p>

                <form
                  className="mt-7 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  noValidate
                >
                  <Field label="Имя" error={errors.name}>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      invalid={!!errors.name}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Телефон" error={errors.phone}>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="+7 (999) 123-45-67"
                      inputMode="tel"
                      invalid={!!errors.phone}
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Вопрос (необязательно)">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Площадь, участок, сроки…"
                      className="min-h-24"
                    />
                  </Field>

                  <ConsentCheckbox
                    checked={consent}
                    onChange={setConsent}
                    error={errors.consent}
                  >
                    Я согласен на{" "}
                    <a
                      href="#/privacy"
                      className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
                    >
                      обработку персональных данных
                    </a>{" "}
                    и ознакомлен с политикой конфиденциальности.
                  </ConsentCheckbox>

                  <Button type="submit" size="lg" className="w-full">
                    Отправить заявку
                  </Button>
                  <p className="text-center text-[0.72rem] leading-relaxed text-forest/45">
                    Нажимая кнопку, вы даёте согласие на обработку указанных данных в
                    соответствии с № 152-ФЗ. Данные передаются только исполнителю и не
                    передаются третьим лицам.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
