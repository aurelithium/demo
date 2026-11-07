import { useState } from "react";
import { addRequest, formatPhone, isValidPhone, uid } from "@/lib/store";
import { useToast } from "./ui";
import { Button, ConsentCheckbox, Field, Icon, Input, Select, Textarea } from "./ui";

const SERVICES = [
  "Строительство каркасного дома",
  "Строительство дома из газобетона",
  "Строительство дома из пеноблоков",
  "Черновая отделка",
  "Проектирование дома",
  "Строительство террасы",
  "Другое / консультация",
];

export function LeadForm({
  tone = "light",
  title = "Обсудить проект",
  subtitle = "Заполните форму — свяжусь в рабочее время и подробно расскажу об этапах, сроках и порядке оплаты.",
}: {
  tone?: "light" | "dark";
  title?: string;
  subtitle?: string;
}) {
  const { notify } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите имя (минимум 2 символа)";
    if (!isValidPhone(phone)) next.phone = "Телефон в формате +7 (999) 123-45-67";
    if (!consent) next.consent = "Без согласия на обработку данных мы не сможем ответить";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    addRequest({
      id: uid(),
      email: email.trim().toLowerCase() || "guest",
      service,
      area: area.trim() || "—",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "new",
    });
    setDone(true);
    notify("Заявка отправлена. Свяжусь с вами в рабочее время.");
  };

  if (done) {
    return (
      <div
        className={
          tone === "dark"
            ? "rounded-3xl border border-bone/15 bg-forest/60 p-8 text-center sm:p-10"
            : "rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft sm:p-10"
        }
      >
        <span
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
            tone === "dark" ? "bg-pine text-bone" : "bg-pine/12 text-pine"
          }`}
        >
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3
          className={`mt-6 text-3xl font-semibold ${
            tone === "dark" ? "text-bone" : "text-forest"
          }`}
        >
          Заявка отправлена
        </h3>
        <p
          className={`mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed ${
            tone === "dark" ? "text-bone/70" : "text-forest/70"
          }`}
        >
          Спасибо, {name.trim() || "обращение"} принято. Отвечу в рабочее время: пн–сб,
          09:00–20:00. Если вопрос срочный — позвоните по номеру{" "}
          <a
            href="tel:+74951234567"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            +7 (495) 123-45-67
          </a>
          .
        </p>
        <Button
          variant={tone === "dark" ? "primary" : "outline"}
          className="mt-8"
          onClick={() => {
            setDone(false);
            setName("");
            setPhone("");
            setEmail("");
            setMessage("");
            setArea("");
            setConsent(false);
          }}
        >
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <div
      className={
        tone === "dark"
          ? "rounded-3xl border border-bone/15 bg-forest/60 p-7 backdrop-blur-sm sm:p-9"
          : "rounded-3xl border border-forest/10 bg-white p-7 shadow-soft sm:p-9"
      }
    >
      <h3
        className={`text-3xl font-semibold ${tone === "dark" ? "text-bone" : "text-forest"}`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 text-[0.92rem] leading-relaxed ${
          tone === "dark" ? "text-bone/65" : "text-forest/65"
        }`}
      >
        {subtitle}
      </p>

      <form
        className="mt-7 space-y-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" error={errors.name}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван"
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
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Услуга">
            <Select
              value={service}
              onChange={(e) => setService(e.target.value)}
              aria-label="Услуга"
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Площадь, м²">
            <Input
              value={area}
              onChange={(e) => setArea(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="70"
              inputMode="numeric"
            />
          </Field>
        </div>
        <Field label="E-mail (необязательно)">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.ru"
            type="email"
            autoComplete="email"
          />
        </Field>
        <Field label="Комментарий">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Участок, сроки, пожелания по фундаменту и кровле…"
          />
        </Field>

        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent}>
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
        <p
          className={`text-center text-[0.72rem] leading-relaxed ${
            tone === "dark" ? "text-bone/40" : "text-forest/45"
          }`}
        >
          Оператор персональных данных обрабатывает указанные данные исключительно для
          ответа на обращение, в соответствии с № 152-ФЗ.
        </p>
      </form>
    </div>
  );
}
