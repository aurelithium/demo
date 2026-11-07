import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUser,
  findUser,
  isValidEmail,
  isValidPhone,
  storage,
  type User,
} from "./store";

/**
 * Демонстрационный клиентский слой авторизации.
 * В продакшн-версине аутентификация выполняется на сервере:
 * пароли не хранятся в открытом виде, используется HTTPS и httpOnly-cookie.
 */
function weakHash(value: string): string {
  let h = 5381;
  for (let i = 0; i < value.length; i++) h = (h * 33) ^ value.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export type PublicUser = Omit<User, "password">;

type AuthValue = {
  user: PublicUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const email = storage.getSession();
    if (email) {
      const found = findUser(email);
      if (found) {
        const { password: _password, ...rest } = found;
        setUser(rest);
      }
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const found = findUser(email);
    if (!found || found.password !== weakHash(password)) {
      return { ok: false, error: "Неверный e-mail или пароль" };
    }
    storage.setSession(found.email);
    const { password: _password, ...rest } = found;
    setUser(rest);
    return { ok: true };
  }, []);

  const register = useCallback(
    (data: { name: string; email: string; phone: string; password: string }) => {
      if (data.name.trim().length < 2) {
        return { ok: false, error: "Укажите имя (минимум 2 символа)" };
      }
      if (!isValidEmail(data.email)) {
        return { ok: false, error: "Укажите корректный e-mail" };
      }
      if (!isValidPhone(data.phone)) {
        return { ok: false, error: "Укажите телефон в формате +7 (999) 123-45-67" };
      }
      if (data.password.length < 6) {
        return { ok: false, error: "Пароль должен содержать минимум 6 символов" };
      }
      if (findUser(data.email)) {
        return { ok: false, error: "Аккаунт с таким e-mail уже зарегистрирован" };
      }
      const newUser: User = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone,
        password: weakHash(data.password),
        createdAt: new Date().toISOString(),
      };
      createUser(newUser);
      storage.setSession(newUser.email);
      const { password: _password, ...rest } = newUser;
      setUser(rest);
      return { ok: true };
    },
    [],
  );

  const logout = useCallback(() => {
    storage.setSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
