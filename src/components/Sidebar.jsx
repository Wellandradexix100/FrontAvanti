import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  LayoutDashboard,
  LogIn,
  UserPlus,
  BookCopy,
  LogOut,
  X,
  UserCircle,
} from "lucide-react";

export function Sidebar({ isOpen, fecharSidebar }) {
  const { user, logado, logout } = useAuth();
  const location = useLocation();

  const navLinkClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
    ${
      location.pathname === path
        ? "bg-brand text-white shadow-md shadow-brand/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }
  `;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={fecharSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 shadow-xl lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 text-brand"
            onClick={fecharSidebar}
          >
            <img src="/logo.png" alt="Logo Avanti Skills" className="w-6 h-6" />
            <span className="font-bold text-xl tracking-tight text-slate-900 rounded-md">
              AprendeAí
            </span>
          </Link>
          <button
            onClick={fecharSidebar}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <Link to="/" className={navLinkClass("/")} onClick={fecharSidebar}>
            <Home className="w-5 h-5" />
            Vitrine Home
          </Link>

          {logado && (
            <>
              <Link
                to="/dashboard"
                className={navLinkClass("/dashboard")}
                onClick={fecharSidebar}
              >
                <LayoutDashboard className="w-5 h-5" />
                Meu Painel
              </Link>

              <Link
                to="/perfil"
                className={navLinkClass("/perfil")}
                onClick={fecharSidebar}
              >
                <UserCircle className="w-5 h-5" />
                Meu Perfil
              </Link>
            </>
          )}

          {!logado && (
            <>
              <div className="mt-6 mb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Acesso
              </div>
              <Link
                to="/login"
                className={navLinkClass("/login")}
                onClick={fecharSidebar}
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className={navLinkClass("/cadastro")}
                onClick={fecharSidebar}
              >
                <UserPlus className="w-5 h-5" />
                Cadastrar
              </Link>
            </>
          )}
        </nav>

        {logado && (
          <div className="p-4 border-t border-slate-100 shrink-0">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide font-semibold">
                Conta logada
              </p>
              <p
                className="font-bold text-slate-800 truncate"
                title={user?.nome}
              >
                {user?.nome}
              </p>
              <button
                onClick={() => {
                  logout();
                  fecharSidebar();
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
