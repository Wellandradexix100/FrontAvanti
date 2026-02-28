import { useAuth } from "../contexts/AuthContext";
import { Menu, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export function Header({ abrirSidebar }) {
  const { user, logado } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  return (
    <header className="bg-white border-b border-slate-200 h-20 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={abrirSidebar}
          className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {logado ? (
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-400 hover:text-brand transition-colors rounded-full hover:bg-brand-light hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <Link
              to="/perfil"
              className="group flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-light shadow-sm flex items-center justify-center bg-slate-100 shrink-0">
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
                  className="w-full h-full items-center justify-center bg-brand text-white font-bold text-lg"
                >
                  {user?.nome?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="hidden md:block text-left leading-tight">
                <p className="font-bold text-slate-800 text-sm group-hover:text-brand transition-colors">
                  {user?.nome?.split(" ")[0]}
                </p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">
                  Meu Perfil
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <span className="text-sm text-slate-500 font-medium px-4 py-2 bg-slate-50 rounded-lg border border-slate-100 hidden sm:block">
            Bem-vindo visitante
          </span>
        )}
      </div>
    </header>
  );
}
