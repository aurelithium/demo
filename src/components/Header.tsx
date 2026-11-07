import { useEffect, useState } from "react";
import { COMPANY, NAV } from "@/data/content";
import { useAuth } from "@/lib/auth";
import { useRouter } from "@/lib/router";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import { Icon } from "./ui";

export function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-6 focus:py-3 focus:text-sm focus:text-bone"
      >
        Перейти к основному содержанию
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* верхняя информационная панель */}
        <div
          className={cn(
            "hidden bg-forest text-bone transition-all duration-500 lg:block",
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100",
          )}
        >
          <div className="mx-auto flex h-10 max-w-[1280px] items-center justify-between px-8 text-[0.72rem] tracking-wide">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-amber">
                <Icon name="shield" className="h-3.5 w-3.5" />
                Работаю без предоплаты · оплата по этапам
              </span>
              <span className="text-bone/50">{COMPANY.addressShort}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-bone/70">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                {COMPANY.schedule}
              </span>
              <a
                href={COMPANY.phoneHref}
                className="link-underline font-semibold text-bone transition-colors hover:text-amber"
              >
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>

        {/* основная панель */}
        <div
          className={cn(
            "border-b transition-all duration-500",
            scrolled
              ? "border-forest/10 bg-bone/90 shadow-[0_10px_40px_-24px_rgba(8,18,13,0.45)] backdrop-blur-xl"
              : "border-transparent bg-bone/70 backdrop-blur-md",
          )}
        >
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:py-4">
            <Logo />

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
              {NAV.map((item) => {
                const active = path === item.path;
                return (
                  <a
                    key={item.path}
                    href={`#${item.path}`}
                    data-active={active}
                    className={cn(
                      "link-underline text-[0.86rem] font-semibold transition-colors",
                      active ? "text-timber" : "text-forest/75 hover:text-forest",
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={COMPANY.phoneHref}
                className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-bone lg:hidden"
                aria-label={`Позвонить: ${COMPANY.phone}`}
              >
                <Icon name="phone" className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={user ? "#/cabinet" : "#/login"}
                className="hidden h-11 items-center gap-2 rounded-full border border-forest/15 px-5 text-[0.82rem] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-bone sm:inline-flex"
              >
                <Icon name="user" className="h-4 w-4" />
                {user ? "Кабинет" : "Войти"}
              </a>
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-timber px-5 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:bg-[#9c6a33] active:scale-[0.98] sm:px-6"
              >
                Обсудить проект
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-bone lg:hidden"
                aria-label="Открыть меню"
                aria-expanded={menuOpen}
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* мобильное меню */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-night/60 backdrop-blur-sm transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "grain absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-forest px-7 pt-7 pb-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo tone="dark" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone hover:text-forest"
              aria-label="Закрыть меню"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-1" aria-label="Мобильная навигация">
            {NAV.map((item, i) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-bone/10 py-4 font-display text-3xl font-semibold transition-colors",
                  path === item.path ? "text-amber" : "text-bone hover:text-amber",
                )}
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={user ? "#/cabinet" : "#/login"}
              onClick={() => setMenuOpen(false)}
              className="border-b border-bone/10 py-4 font-display text-3xl font-semibold text-bone transition-colors hover:text-amber"
            >
              {user ? "Кабинет" : "Войти"}
            </a>
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-3 text-lg font-semibold text-bone"
            >
              <Icon name="phone" className="h-5 w-5 text-amber" />
              {COMPANY.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-bone/60">
              <Icon name="pin" className="h-5 w-5 text-amber" />
              {COMPANY.address}
            </p>
            <p className="flex items-center gap-3 text-sm text-bone/60">
              <Icon name="calendar" className="h-5 w-5 text-amber" />
              {COMPANY.scheduleFull}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
