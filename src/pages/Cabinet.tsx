import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@/lib/router";
import { addRequest, requestsOf, storage, uid, type Request } from "@/lib/store";
import { DOCUMENTS } from "@/data/content";
import { Button, Field, Icon, Input, LinkButton, Select, Textarea, useToast } from "@/components/ui";

const SERVICE_OPTIONS = [
  "Строительство каркасного дома",
  "Строительство дома из газобетона",
  "Строительство дома из пеноблоков",
  "Черновая отделка",
  "Проектирование дома",
  "Строительство террасы",
  "Консультация",
];

const STATUS: Record<Request["status"], { label: string; className: string }> = {
  new: { label: "Новая", className: "bg-timber/12 text-timber" },
  "in-review": { label: "В работе", className: "bg-pine/12 text-pine" },
  answered: { label: "Отвечено", className: "bg-forest/8 text-forest/60" },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function Cabinet() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [requests, setRequests] = useState<Request[]>([]);
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) setRequests(requestsOf(user.email));
  }, [user]);

  if (!user) {
    return (
      <section className="mx-auto max-w-[1280px] px-5 pt-36 pb-24 sm:px-8 lg:pt-44">
        <div className="mx-auto max-w-xl rounded-3xl border border-forest/10 bg-white p-9 text-center shadow-soft">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest/5 text-timber">
            <Icon name="user" className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-forest">Требуется вход</h1>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-forest/65">
            Личный кабинет доступен авторизованным пользователям. Войдите или создайте
            аккаунт — это займёт меньше минуты.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton to="/login">Войти</LinkButton>
            <LinkButton to="/register" variant="outline">
              Регистрация
            </LinkButton>
          </div>
        </div>
      </section>
    );
  }

  const submitRequest = () => {
    const next: Record<string, string> = {};
    if (message.trim().length < 10)
      next.message = "Опишите задачу подробнее (минимум 10 символов)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const item: Request = {
      id: uid(),
      email: user.email,
      service,
      area: area.trim() || "—",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    addRequest(item);
    setRequests([item, ...requests]);
    setMessage("");
    setArea("");
    notify("Заявка сохранена в личном кабинете");
  };

  const deleteAccount = () => {
    const users = storage.getUsers().filter((u) => u.email !== user.email);
    storage.saveUsers(users);
    const rest = storage.getRequests().filter((r) => r.email !== user.email);
    storage.saveRequests(rest);
    logout();
    notify("Аккаунт и связанные данные удалены");
    navigate("/");
  };

  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-36 pb-24 sm:px-8 lg:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-caps text-timber">Личный кабинет</p>
          <h1 className="mt-4 text-4xl font-semibold text-forest sm:text-5xl">
            Здравствуйте, {user.name}
          </h1>
          <p className="mt-4 text-[0.98rem] text-forest/65">
            {user.email} · {user.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton to="/documents" variant="outline">
            <Icon name="document" className="h-4 w-4" />
            Документы
          </LinkButton>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <Icon name="logout" className="h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* заявки */}
        <div>
          <div className="rounded-3xl border border-forest/10 bg-white p-7 shadow-soft sm:p-8">
            <h2 className="text-2xl font-semibold text-forest">Мои заявки</h2>
            <p className="mt-2 text-[0.9rem] text-forest/60">
              Здесь отображаются обращения, отправленные из личного кабинета.
            </p>

            {requests.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-forest/15 px-6 py-12 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest/5 text-forest/40">
                  <Icon name="calendar" className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[0.95rem] text-forest/60">
                  Заявок пока нет. Создайте первую — форма справа.
                </p>
              </div>
            ) : (
              <ul className="mt-7 space-y-4">
                {requests.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-forest/10 bg-sand/50 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-[1.05rem] font-semibold text-forest">
                        {item.service}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold ${STATUS[item.status].className}`}
                      >
                        {STATUS[item.status].label}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.85rem] text-forest/55">
                      {formatDate(item.createdAt)} · площадь: {item.area}
                    </p>
                    {item.message && (
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-forest/75">
                        {item.message}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 rounded-3xl border border-forest/10 bg-sand/60 p-7">
            <h2 className="text-xl font-semibold text-forest">Шаблоны документов</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {DOCUMENTS.map((doc) => (
                <a
                  key={doc.id}
                  href="#/documents"
                  className="group rounded-2xl border border-forest/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-timber/40 hover:shadow-soft"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest/5 text-timber">
                    <Icon name="document" className="h-5 w-5" />
                  </span>
                  <span className="mt-4 block text-[0.95rem] font-semibold text-forest">
                    {doc.tab}
                  </span>
                  <span className="mt-1 block text-[0.78rem] text-forest/50">
                    Открыть шаблон
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* новая заявка + данные */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-forest/10 bg-white p-7 shadow-soft">
            <h2 className="text-2xl font-semibold text-forest">Новая заявка</h2>
            <p className="mt-2 text-[0.9rem] text-forest/60">
              Опишите задачу — отвечу в рабочее время, пн–сб 09:00–20:00.
            </p>
            <div className="mt-6 space-y-4">
              <Field label="Услуга">
                <Select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  aria-label="Услуга"
                >
                  {SERVICE_OPTIONS.map((s) => (
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
              <Field label="Описание задачи" error={errors.message}>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Участок, сроки, пожелания по фундаменту и кровле…"
                  invalid={!!errors.message}
                />
              </Field>
              <Button className="w-full" onClick={submitRequest}>
                Отправить заявку
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-forest/10 bg-white p-7">
            <h2 className="text-xl font-semibold text-forest">Ваши данные</h2>
            <dl className="mt-5 space-y-3.5 text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-forest/50">Имя</dt>
                <dd className="font-semibold text-forest">{user.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-forest/50">E-mail</dt>
                <dd className="font-semibold break-all text-forest">{user.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-forest/50">Телефон</dt>
                <dd className="font-semibold text-forest">{user.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-forest/50">Аккаунт создан</dt>
                <dd className="font-semibold text-forest">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
            </dl>

            <div className="mt-7 rounded-2xl bg-sand/70 p-5">
              <p className="label-caps text-timber">152-ФЗ</p>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-forest/60">
                Вы вправе запросить сведения об обработке ваших персональных данных,
                их уточнение, блокирование или удаление. Кнопка ниже удаляет аккаунт и
                все связанные заявки из этого браузера.
              </p>
              <button
                type="button"
                onClick={deleteAccount}
                className="mt-4 text-[0.82rem] font-semibold text-clay underline decoration-clay/40 underline-offset-2 transition-colors hover:text-forest"
              >
                Удалить аккаунт и все данные
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
