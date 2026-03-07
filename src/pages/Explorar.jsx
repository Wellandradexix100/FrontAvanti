import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CardOferta } from "../components/CardOferta";
import { api } from "../services/api";
import { PublicNavbar } from "../components/PublicNavbar";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import {
  BookOpen,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Explorar() {
  const [ofertas, setOfertas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const { user } = useAuth();
  const navigate = useNavigate();
  const cursosRef = useRef(null);

  useEffect(() => {
    async function carregarOfertas() {
      setCarregando(true);
      try {
        const queryBusca = busca ? `&busca=${busca}` : "";
        const queryUsuario = user ? `&usuario_id=${user.id}` : "";

        const endpoint = `/ofertas?pagina=${paginaAtual}&limite=9${queryBusca}${queryUsuario}`;

        const resposta = await api.get(endpoint);

        setOfertas(resposta.data.dados);
        setTotalPaginas(resposta.data.paginacao.totalPaginas);
      } catch (erro) {
        console.error("Erro ao carregar ofertas", erro);
      } finally {
        setCarregando(false);
      }
    }

    const delayDebounceFn = setTimeout(() => {
      carregarOfertas();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [paginaAtual, busca, user]);

  const handleAdquirir = async (ofertaId) => {
    if (!user) {
      toast.info("Faça login ou cadastre-se para adquirir um conhecimento!");
      navigate("/login");
      return;
    }

    try {
      await api.post(`/ofertas/${ofertaId}/adquirir`);
      toast.success(
        "Conhecimento adquirido! Vá para o seu Dashboard para acessar.",
      );
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao adquirir conhecimento.";
      toast.error(mensagemErro);
    }
  };

  const scrollToCursos = () => {
    cursosRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
    scrollToCursos();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4" ref={cursosRef}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Explorar Conhecimentos
              </h1>
              <p className="text-slate-600 text-lg">
                Procure por título, descrição ou categoria e descubra o que a
                comunidade tem para ensinar.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setPaginaAtual(1);
                  }}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all shadow-sm text-slate-700 placeholder-slate-400"
                />
              </div>
              <button
                className="w-full sm:w-auto p-3.5 bg-brand-light/30 border border-brand/20 rounded-xl text-brand hover:bg-brand-light/60 transition-colors shadow-sm flex items-center justify-center gap-2"
                title="Filtros avançados (em breve)"
              >
                <Filter className="w-5 h-5" />
                <span className="sm:hidden font-medium">Filtros</span>
              </button>
            </div>
          </div>

          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-slate-100 rounded-2xl p-6 h-[280px] shadow-sm animate-pulse flex flex-col"
                >
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-slate-200 rounded-md w-2/3"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-5/6 mb-auto"></div>
                  <div className="h-12 bg-slate-200 rounded-xl w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : ofertas.length === 0 && !busca ? (
            <div className="text-center py-24 bg-brand-light/20 rounded-3xl border border-brand/25 border-dashed">
              <BookOpen className="w-16 h-16 text-brand/55 mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                Nenhum conhecimento disponível
              </h3>
              <p className="text-slate-600 text-lg">
                Seja o primeiro a compartilhar o que você sabe!
              </p>
            </div>
          ) : ofertas.length === 0 && busca ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-slate-500 text-lg">
                Não encontramos nenhum curso com o termo "{busca}".
              </p>
              <button
                onClick={() => setBusca("")}
                className="mt-6 text-brand font-semibold hover:underline"
              >
                Limpar busca e ver todos
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ofertas.map((oferta) => (
                  <CardOferta key={oferta.id} oferta={oferta}>
                    {user?.id === oferta.pessoa_id ? (
                      <Button
                        variant="secondary"
                        className="w-full bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed font-semibold rounded-xl"
                        disabled
                      >
                        Sua Oferta
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="w-full font-bold shadow-md rounded-xl"
                        onClick={() => handleAdquirir(oferta.id)}
                      >
                        {!user
                          ? "Fazer Login para Adquirir"
                          : "Adquirir Conhecimento"}
                      </Button>
                    )}
                  </CardOferta>
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8">
                  <p className="text-sm text-slate-500">
                    Mostrando a página{" "}
                    <span className="font-semibold text-slate-700">
                      {paginaAtual}
                    </span>{" "}
                    de{" "}
                    <span className="font-semibold text-slate-700">
                      {totalPaginas}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => mudarPagina(paginaAtual - 1)}
                      disabled={paginaAtual === 1}
                      className="px-4 py-2 flex items-center gap-1 rounded-xl bg-brand-light/30 border border-brand/20 text-brand hover:bg-brand-light/60 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" /> Anterior
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => mudarPagina(paginaAtual + 1)}
                      disabled={paginaAtual === totalPaginas}
                      className="px-4 py-2 flex items-center gap-1 rounded-xl bg-brand-light/30 border border-brand/20 text-brand hover:bg-brand-light/60 disabled:opacity-50"
                    >
                      Próxima <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm mt-auto">
        <p>
          © {new Date().getFullYear()} AprendeAí. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
