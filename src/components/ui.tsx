import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";

/* ------------------------------- Иконки -------------------------------- */

const paths: Record<string, ReactNode> = {
  wallet: (
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.5Z" />
      <path d="M3 8h11" />
      <path d="M16.5 13.5h1.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l3 3v3h-7" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="16.5" cy="18.5" r="1.8" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9M15 21v-6" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z" />
      <path d="M9.2 12.2l2 2 3.6-3.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 14.5 14.5 3 21 9.5 9.5 21 3 14.5Z" />
      <path d="M7 12l2 2M10 9l2 2M13 6l2 2" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  foundation: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V9m4 11V9m4 11V9m4 11V9" />
      <path d="M4 9h16" />
    </>
  ),
  wall: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M3 15h18M9 4v6M15 10v5M9 15v5" />
    </>
  ),
  roof: <path d="M3 11.5 12 4l9 7.5M5 10.5V20h14V10.5M9.5 20v-5h5v5" />,
  pipe: (
    <>
      <path d="M4 6h6a4 4 0 0 1 4 4v8" />
      <path d="M14 18h6M4 18h4" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  brush: (
    <>
      <path d="M4 20c0-3 2-4 4-4" />
      <path d="M8 16 18 6a2 2 0 0 0-3-3L5 13" />
      <path d="M14 7l3 3" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M12 4v16M4 12h16" />
    </>
  ),
  tree: (
    <>
      <path d="M12 3 6 12h3l-4 6h14l-4-6h3L12 3Z" />
      <path d="M12 18v3" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M15 8l4 4-4 4M19 12H9" />
    </>
  ),
  star: (
    <path d="m12 4 2.4 5 5.6.8-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.6-.8L12 4Z" />
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.home}
    </svg>
  );
}

/* ------------------------------- Кнопки -------------------------------- */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  to?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";
  const sizes = {
    sm: "px-5 py-2.5 text-[0.8rem]",
    md: "px-7 py-3.5 text-[0.85rem]",
    lg: "px-9 py-4 text-[0.95rem]",
  };
  const variants = {
    primary:
      "bg-timber text-white shadow-[0_10px_30px_-10px_rgba(178,123,62,0.7)] hover:bg-[#9c6a33] hover:shadow-[0_16px_40px_-12px_rgba(178,123,62,0.8)] active:scale-[0.98]",
    dark: "bg-forest text-bone hover:bg-night active:scale-[0.98]",
    outline:
      "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-bone active:scale-[0.98]",
    ghost: "text-forest hover:bg-forest/5",
  };
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: {
  to: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={`#${to}`}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]",
        size === "sm" && "px-5 py-2.5 text-[0.8rem]",
        size === "md" && "px-7 py-3.5 text-[0.85rem]",
        size === "lg" && "px-9 py-4 text-[0.95rem]",
        variant === "primary" &&
          "bg-timber text-white shadow-[0_10px_30px_-10px_rgba(178,123,62,0.7)] hover:bg-[#9c6a33]",
        variant === "dark" && "bg-forest text-bone hover:bg-night",
        variant === "outline" &&
          "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-bone",
        variant === "ghost" && "text-forest hover:bg-forest/5",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ------------------------------ Анимации ------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------- Заголовки ----------------------------- */

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-3",
        tone === "light" ? "text-timber" : "text-amber",
        className,
      )}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrowLabel(eyebrow, tone)}
      <h2
        className={cn(
          "mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]",
          tone === "light" ? "text-forest" : "text-bone",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 text-[1.02rem] leading-relaxed",
            tone === "light" ? "text-forest/70" : "text-bone/70",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function eyebrowLabel(eyebrow: string | undefined, tone: "light" | "dark" = "light") {
  if (!eyebrow) return null;
  return <Eyebrow tone={tone}>{eyebrow}</Eyebrow>;
}

/* -------------------------------- Поля -------------------------------- */

export function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label-caps mb-2 block text-forest/60">{label}</span>
      {children}
      {hint && !error && (
        <span className="mt-1.5 block text-xs text-forest/45">{hint}</span>
      )}
      {error && (
        <span className="mt-1.5 block text-xs font-semibold text-clay">
          {error}
        </span>
      )}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-[0.95rem] text-forest placeholder:text-forest/35 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-timber/40";

export function Input({
  className,
  invalid,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(
        inputBase,
        invalid ? "border-clay/60" : "border-forest/15 hover:border-forest/30",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        inputBase,
        "min-h-32 resize-y",
        invalid ? "border-clay/60" : "border-forest/15 hover:border-forest/30",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}

export function Select({
  className,
  children,
  ...rest
}: InputHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={cn(inputBase, "border-forest/15 hover:border-forest/30", className)} {...rest}>
      {children}
    </select>
  );
}

export function ConsentCheckbox({
  checked,
  onChange,
  error,
  tone = "light",
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-forest/30 accent-timber"
        />
        <span
          className={cn(
            "text-[0.8rem] leading-relaxed",
            tone === "light" ? "text-forest/65" : "text-bone/65",
          )}
        >
          {children}
        </span>
      </label>
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-clay">{error}</p>
      )}
    </div>
  );
}

/* ------------------------------ Аккордеон ------------------------------ */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-timber"
            >
              <span className="font-display text-xl font-semibold sm:text-[1.4rem]">
                {item.q}
              </span>
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-timber bg-timber text-white"
                    : "border-forest/20 text-forest",
                )}
              >
                <Icon name="plus" className="h-4 w-4" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 text-[0.97rem] leading-relaxed text-forest/70">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------- Хлебные ------------------------------ */

export function Breadcrumbs({
  items,
}: {
  items: { label: string; path?: string }[];
}) {
  return (
    <nav aria-label="Навигация" className="flex flex-wrap items-center gap-2 text-xs">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-bone/30">/</span>}
          {item.path ? (
            <a
              href={`#${item.path}`}
              className="text-bone/60 transition-colors hover:text-amber"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-bone/90">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* --------------------------- Уведомления ------------------------------ */

type ToastCtx = { notify: (message: string) => void };
const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const idRef = useRef<number | null>(null);

  const notify = (text: string) => {
    setMessage(text);
    if (idRef.current) window.clearTimeout(idRef.current);
    idRef.current = window.setTimeout(() => setMessage(null), 4500);
  };

  useEffect(() => {
    return () => {
      if (idRef.current) window.clearTimeout(idRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4 transition-all duration-500",
          message
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
        aria-live="polite"
      >
        {message && (
          <div className="flex items-center gap-3 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-bone shadow-lift">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-pine text-white">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

/* ------------------------------ Прочее -------------------------------- */

export function useAutoId(prefix = "id") {
  const generated = useId();
  return `${prefix}-${generated}`;
}
