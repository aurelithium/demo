import { COMPANY } from "@/data/content";
import { LinkButton } from "@/components/ui";

export function NotFound() {
  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden bg-forest pt-32 pb-20">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(220,169,98,0.5), transparent 65%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="font-display text-[7rem] leading-none font-semibold text-amber sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-bone sm:text-5xl">
          Страница не найдена
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-bone/70">
          Похоже, такой страницы нет. Возможно, ссылка устарела. Вернитесь на главную
          или посмотрите услуги и цены — {COMPANY.tagline}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton to="/" size="lg">
            На главную
          </LinkButton>
          <LinkButton
            to="/services"
            size="lg"
            variant="outline"
            className="border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-forest"
          >
            Услуги и цены
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
