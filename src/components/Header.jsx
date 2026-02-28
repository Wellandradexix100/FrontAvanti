import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
  BookCopy,
} from "lucide-react";

export function Header() {
  const { user, logado, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <BookCopy className="w-7 h-7" />
          <span className="font-bold text-xl tracking-tight">
            Troca de Conhecimento
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {!logado ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" /> Entrar
              </Link>
              <Link
                to="/cadastro"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <UserPlus className="w-4 h-4" /> Cadastrar
              </Link>
            </>
          ) : (
            <>
              <span className="text-slate-500 hidden sm:inline">
                Olá,{" "}
                <strong className="text-slate-800">
                  {user?.nome.split(" ")[0]}
                </strong>
              </span>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" /> Painel
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors ml-2"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
