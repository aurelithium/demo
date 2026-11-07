import { COMPANY } from "@/data/content";
import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="12"
        className="fill-forest"
      />
      <path
        d="M12 24.5 24 14l12 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber"
      />
      <path
        d="M15.5 23v11h17V23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-bone"
      />
      <path
        d="M24 23v11M19.5 23v11M28.5 23v11"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-bone/50"
      />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <a
      href="#/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${COMPANY.brand} — на главную`}
    >
      <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.65rem] font-semibold tracking-[0.14em]",
            tone === "light" ? "text-forest" : "text-bone",
          )}
        >
          {COMPANY.brand}
        </span>
        <span
          className={cn(
            "label-caps mt-1 text-[0.55rem]",
            tone === "light" ? "text-forest/45" : "text-bone/45",
          )}
        >
          {COMPANY.brandLine}
        </span>
      </span>
    </a>
  );
}
