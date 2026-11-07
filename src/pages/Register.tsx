import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@/lib/router";
import { formatPhone, isValidPhone } from "@/lib/store";
import { AuthShell } from "@/components/AuthShell";
import { Button, ConsentCheckbox, Field, Icon, Input } from "@/components/ui";

export function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (user) navigate("/cabinet");
  }, [user, navigate]);

  const submit = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите имя (минимум 2 символа)";
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/.test(email.trim()))
      next.email = "Укажите корректный e-mail";
    if (!isValidPhone(phone)) next.phone = "Телефон в формате +7 (999) 123-45-67";
    if (password.length < 6) next.password = "Пароль должен содержать минимум 6 символов";
    if (confirm !== password) next.confirm = "Пароли не совпадают";
    if (!consent) next.consent = "Без согласия на обработку данных регистрация невозможна";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length > 0) return;

    const result = register({ name, email, phone, password });
    if (!result.ok) {
      setFormError(result.error ?? "Не удалось создать аккаунт");
      return;
    }
    navigate("/cabinet");
  };

  return (
    <AuthShell
      title="Регистрация"
      subtitle="Создайте аккаунт, чтобы отправлять заявки по проекту, хранить историю обращений и получать шаблоны документов."
      footer={
        <p className="text-center text-[0.88rem] text-forest/65">
          Уже есть аккаунт?{" "}
          <a
            href="#/login"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            Войти
          </a>
        </p>
      }
    >
      <h2 className="text-3xl font-semibold text-forest">Создать аккаунт</h2>
      <p className="mt-2 text-[0.92rem] text-forest/60">
        Заполните форму — аккаунт будет создан сразу.
      </p>

      <form
        className="mt-7 space-y-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Field label="Имя" error={errors.name}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            autoComplete="name"
            invalid={!!errors.name}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="E-mail" error={errors.email}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="mail@example.ru"
              autoComplete="email"
              invalid={!!errors.email}
            />
          </Field>
          <Field label="Телефон" error={errors.phone}>
            <Input
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              type="tel"
              inputMode="tel"
              placeholder="+7 (999) 123-45-67"
              autoComplete="tel"
              invalid={!!errors.phone}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Пароль" error={errors.password}>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Минимум 6 символов"
              autoComplete="new-password"
              invalid={!!errors.password}
            />
          </Field>
          <Field label="Повторите пароль" error={errors.confirm}>
            <Input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              invalid={!!errors.confirm}
            />
          </Field>
        </div>

        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent}>
          Я подтверждаю согласие на{" "}
          <a
            href="#/consent"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            обработку персональных данных
          </a>
          , ознакомлен с{" "}
          <a
            href="#/privacy"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            политикой конфиденциальности
          </a>{" "}
          и принимаю{" "}
          <a
            href="#/terms"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            пользовательское соглашение
          </a>
          .
        </ConsentCheckbox>

        {formError && (
          <p className="rounded-xl border border-clay/30 bg-clay/8 px-4 py-3 text-[0.85rem] font-semibold text-clay">
            {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          Зарегистрироваться
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-[0.74rem] leading-relaxed text-forest/45">
        Регистрируясь, вы соглашаетесь получать ответы на свои обращения по указанным
        контактам. Данные не передаются третьим лицам и обрабатываются в соответствии
        с № 152-ФЗ.
      </p>
    </AuthShell>
  );
}
