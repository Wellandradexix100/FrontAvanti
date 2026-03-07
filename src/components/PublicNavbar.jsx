import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { LayoutDashboard } from "lucide-react";

export function PublicNavbar() {
  const location = useLocation();
  const { user } = useAuth();

  const linkBase =
    "text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg";
  const activeClass = "text-brand bg-brand-light/40 shadow-sm";
  const inactiveClass = "text-slate-600 hover:text-brand hover:bg-slate-50";

  return (
    <header className="sticky top-0 z-30 px-4 pt-3 md:pt-4">
      <div className="w-[calc(100%-2rem)] max-w-[1500px] mx-auto">
        <div className="h-16 md:h-20 px-4 md:px-6 flex items-center justify-between gap-4 rounded-2xl bg-white/70 border border-white/60 shadow-sm backdrop-blur-md">
          <div className="w-24 sm:w-28 md:w-32 shrink-0">
            <Link
              to="/"
              className="block w-full transition-transform hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Logo Avanti Skills"
                className="w-full h-auto object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`${linkBase} ${location.pathname === "/" ? activeClass : inactiveClass}`}
            >
              Home
            </Link>

            <Link
              to="/explorar"
              className={`${linkBase} ${location.pathname === "/explorar" ? activeClass : inactiveClass}`}
            >
              Explorar
            </Link>

            {!user && (
              <a
                href="/#como-funciona"
                className={`${linkBase} ${inactiveClass}`}
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 800, behavior: "smooth" });
                  }
                }}
              >
                Como Funciona
              </a>
            )}
          </nav>

          <div className="shrink-0 flex justify-end">
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 group transition-opacity hover:opacity-80"
                    title="Ir para o Dashboard"
                  >
                    <span className="hidden lg:block text-sm font-semibold text-slate-700 max-w-[120px] truncate group-hover:text-brand transition-colors">
                      {user.nome?.split(" ")[0]}
                    </span>

                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-brand-light group-hover:border-brand shadow-sm flex items-center justify-center bg-slate-100 shrink-0 transition-colors">
                      {user?.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      <div
                        style={{ display: user?.avatar_url ? "none" : "flex" }}
                        className="w-full h-full items-center justify-center bg-brand text-white font-bold text-sm md:text-base"
                      >
                        {user?.nome?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </Link>

                  <Link to="/dashboard" className="hidden sm:block">
                    <Button
                      variant="primary"
                      className="h-10 px-5 flex items-center gap-2 text-sm shadow-sm rounded-xl"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Painel
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="hidden sm:block text-sm font-bold text-slate-600 hover:text-brand transition-colors px-2"
                  >
                    Entrar
                  </Link>
                  <Link to="/cadastro" className="block">
                    <Button
                      variant="primary"
                      className="w-auto h-10 px-5 text-sm rounded-xl shadow-md"
                    >
                      Cadastre-se
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
