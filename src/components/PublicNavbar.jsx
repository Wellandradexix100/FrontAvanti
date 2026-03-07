import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { LayoutDashboard } from "lucide-react";

export function PublicNavbar() {
  const location = useLocation();
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const linkBase =
    "inline-flex h-9 md:h-10 items-center justify-center px-4 md:px-5 rounded-lg text-sm font-semibold border border-transparent transition-all duration-[1500ms] ease-out";
  const activeClass =
    "text-brand border-brand/20 outline outline-1 outline-brand";
  const inactiveClass =
    "text-brand opacity-90 hover:opacity-100 hover:text-brand hover:border-brand/20 hover:outline hover:outline-1 hover:outline-brand hover:shadow-[0_0_16px_rgba(196,58,255,0.55)] active:border active:border-brand/20 active:outline active:outline-1 active:outline-brand focus-visible:border-brand/20";

  return (
    <header className="sticky top-0 z-30 px-4 pt-3 md:pt-4">
      <div className="w-[calc(100%-2rem)] max-w-[1500px] mx-auto">
        <div className="h-16 md:h-20 px-3 md:px-6 grid grid-cols-3 items-center gap-2 rounded-2xl bg-white/70 border border-white/60 shadow-sm backdrop-blur-md">
          <div className="justify-self-start w-24 sm:w-28 md:w-32">
            <Link to="/" className="block w-full">
              <img
                src="/logo.png"
                alt="Logo Avanti Skills"
                className="w-full h-auto object-contain"
              />
            </Link>
          </div>

          <Link
            to="/"
            className={`${linkBase} ${
              location.pathname === "/" ? activeClass : inactiveClass
            } justify-self-center`}
          >
            Home
          </Link>

          <div className="justify-self-end">
            <div className="flex items-center justify-end gap-3 w-full">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 group transition-opacity hover:opacity-80"
                    title="Ir para o Dashboard"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-brand/30 group-hover:border-brand transition-colors flex items-center justify-center bg-slate-100 shrink-0">
                      {user?.avatar_url && (
                        <img
                          src={`${user.avatar_url}`}
                          alt={user.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      )}

                      <div
                        style={{ display: user?.avatar_url ? "none" : "flex" }}
                        className="w-full h-full items-center justify-center bg-brand text-white font-bold text-sm md:text-base"
                      >
                        {user?.nome?.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <span className="hidden lg:block text-sm font-medium text-slate-700 max-w-[100px] truncate">
                      {user.nome?.split(" ")[0]}
                    </span>
                  </Link>

                  <Link to="/dashboard" className="hidden sm:block">
                    <Button
                      variant="primary"
                      className="h-9 md:h-10 px-4 flex items-center gap-2 text-sm shadow-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Painel
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="block">
                  <Button
                    variant="primary"
                    className="w-auto h-9 md:h-10 px-4 md:px-5 text-sm"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
