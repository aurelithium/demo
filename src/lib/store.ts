export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
};

export type Request = {
  id: string;
  email: string;
  service: string;
  area: string;
  message: string;
  createdAt: string;
  status: "new" | "in-review" | "answered";
};

const USERS_KEY = "domovoy_users";
const SESSION_KEY = "domovoy_session";
const REQUESTS_KEY = "domovoy_requests";
const CONSENT_KEY = "domovoy_consent";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* хранилище недоступно — молча игнорируем */
  }
}

export const storage = {
  getUsers: () => read<User[]>(USERS_KEY, []),
  saveUsers: (users: User[]) => write(USERS_KEY, users),

  getSession: () => read<string | null>(SESSION_KEY, null),
  setSession: (email: string | null) => write(SESSION_KEY, email),

  getRequests: () => read<Request[]>(REQUESTS_KEY, []),
  saveRequests: (items: Request[]) => write(REQUESTS_KEY, items),

  getConsent: () => read<"all" | "essential" | null>(CONSENT_KEY, null),
  setConsent: (value: "all" | "essential") => write(CONSENT_KEY, value),
};

export function findUser(email: string): User | undefined {
  return storage
    .getUsers()
    .find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function createUser(user: User) {
  storage.saveUsers([...storage.getUsers(), user]);
}

export function addRequest(item: Request) {
  storage.saveRequests([item, ...storage.getRequests()]);
}

export function requestsOf(email: string): Request[] {
  return storage.getRequests().filter((r) => r.email === email);
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/* --- валидация --- */

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += " (" + rest.slice(0, 3);
  if (rest.length >= 3) out += ") " + rest.slice(3, 6);
  if (rest.length >= 6) out += "-" + rest.slice(6, 8);
  if (rest.length >= 8) out += "-" + rest.slice(8, 10);
  return out;
}

export function formatMoney(value: number): string {
  return value.toLocaleString("ru-RU").replace(/,/g, " ");
}
