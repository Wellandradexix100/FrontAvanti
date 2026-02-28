import { BookOpen, User, Tag } from "lucide-react";

export function CardOferta({ oferta, children }) {
  const corNivel = {
    BASICO: "bg-green-100 text-green-700 border-green-200",
    INTERMEDIARIO: "bg-yellow-100 text-yellow-700 border-yellow-200",
    AVANCADO: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-slate-800 line-clamp-2">
          {oferta.titulo}
        </h3>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full border ${corNivel[oferta.nivel]}`}
        >
          {oferta.nivel}
        </span>
      </div>

      <p className="text-slate-600 mb-4 flex-grow line-clamp-3">
        {oferta.descricao}
      </p>

      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center text-sm text-slate-500">
          <Tag className="w-4 h-4 mr-2" />
          <span className="font-medium text-slate-700">{oferta.categoria}</span>
        </div>

        {oferta.pessoa && (
          <div className="flex items-center text-sm text-slate-500">
            <User className="w-4 h-4 mr-2" />
            <span>
              Oferecido por:{" "}
              <span className="font-medium text-slate-700">
                {oferta.pessoa.nome}
              </span>
            </span>
          </div>
        )}
      </div>

      {children && <div className="mt-4 flex gap-2">{children}</div>}
    </div>
  );
}
