import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@/lib/router";
import { AuthShell } from "@/components/AuthShell";
import { Button, ConsentCheckbox, Field, Icon, Input } from "@/components/ui";

export function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (user) navigate("/cabinet");
  }, [user, navigate]);

  const submit = () => {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Укажите e-mail";
    if (password.length < 6) next.password = "Минимум 6 символов";
    if (!consent) next.consent = "Требуется согласие на обработку данных";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length > 0) return;

    const result = login(email, password);
    if (!result.ok) {
      setFormError(result.error ?? "Не удалось войти");
      return;
    }
    navigate("/cabinet");
  };

  return (
    <AuthShell
      title="Вход в личный кабинет"
      subtitle="Войдите, чтобы отправилять заявки по проекту, следить за их статусом и хранить документы в одном месте."
      footer={
        <p className="text-center text-[0.88rem] text-forest/65">
          Нет аккаунта?{" "}
          <a
            href="#/register"
            className="font-semibold text-timber underline decoration-timber/40 underline-offset-2"
          >
            Зарегистрироваться
          </a>
        </p>
      }
    >
      <h2 className="text-3xl font-semibold text-forest">Вход</h2>
      <p className="mt-2 text-[0.92rem] text-forest/60">
        Введите e-mail и пароль, указанные при регистрации.
      </p>

      <form
        className="mt-7 space-y-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
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

        <Field label="Пароль" error={errors.password}>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Минимум 6 символов"
              autoComplete="current-password"
              invalid={!!errors.password}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg px-2 py-1 text-[0.72rem] font-semibold text-forest/45 transition-colors hover:text-timber"
              aria-label={show ? "Скрыть пароль" : "Показать пароль"}
            >
              {show ? "Скрыть" : "Показать"}
            </button>
          </div>
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

        {formError && (
          <p className="rounded-xl border border-clay/30 bg-clay/8 px-4 py-3 text-[0.85rem] font-semibold text-clay">
            {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          Войти
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-[0.74rem] leading-relaxed text-forest/45">
        Демонстрационный режим: учётные данные хранятся локально в вашем браузере и
        не передаются на сервер. В продакшн-версине авторизация выполняется на
        защищённом сервере по протоколу HTTPS.
      </p>
    </AuthShell>
  );
}
