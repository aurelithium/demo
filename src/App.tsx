import { useEffect, useState } from "react";
import { AuthProvider } from "@/lib/auth";
import { RouterProvider, useRouter } from "@/lib/router";
import { CallbackModal } from "@/components/CallbackModal";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/ui";
import { About } from "@/pages/About";
import { Cabinet } from "@/pages/Cabinet";
import { Consent } from "@/pages/Consent";
import { Contacts } from "@/pages/Contacts";
import { Cookies } from "@/pages/Cookies";
import { Documents } from "@/pages/Documents";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { Privacy } from "@/pages/Privacy";
import { Register } from "@/pages/Register";
import { Services } from "@/pages/Services";
import { Terms } from "@/pages/Terms";

const TITLES: Record<string, string> = {
  "/": "ДОМОВОЙ — каркасные дома под ключ в Московской области",
  "/services": "Услуги и цены — ДОМОВОЙ",
  "/about": "О мастере — ДОМОВОЙ",
  "/documents": "Документы: договор, расписка, акт — ДОМОВОЙ",
  "/contacts": "Контакты — ДОМОВОЙ",
  "/login": "Вход в личный кабинет — ДОМОВОЙ",
  "/register": "Регистрация — ДОМОВОЙ",
  "/cabinet": "Личный кабинет — ДОМОВОЙ",
  "/privacy": "Политика обработки персональных данных — ДОМОВОЙ",
  "/terms": "Пользовательское соглашение — ДОМОВОЙ",
  "/consent": "Согласие на обработку персональных данных — ДОМОВОЙ",
  "/cookies": "Использование cookie — ДОМОВОЙ",
};

function CurrentPage({ onOpenModal }: { onOpenModal: () => void }) {
  const { path } = useRouter();

  useEffect(() => {
    document.title = TITLES[path] ?? "Страница не найдена — ДОМОВОЙ";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path]);

  switch (path) {
    case "/":
      return <Home onOpenModal={onOpenModal} />;
    case "/services":
      return <Services />;
    case "/about":
      return <About />;
    case "/documents":
      return <Documents />;
    case "/contacts":
      return <Contacts />;
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    case "/cabinet":
      return <Cabinet />;
    case "/privacy":
      return <Privacy />;
    case "/terms":
      return <Terms />;
    case "/consent":
      return <Consent />;
    case "/cookies":
      return <Cookies />;
    default:
      return <NotFound />;
  }
}

function Shell() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenModal={openModal} />
      <main id="main" className="flex-1">
        <CurrentPage onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={openModal} />
      <CookieBanner />
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <ToastProvider>
          <Shell />
        </ToastProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
