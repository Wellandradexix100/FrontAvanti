import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardOferta } from "../components/CardOferta";
import { api } from "../services/api";
import { PublicNavbar } from "../components/PublicNavbar";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import {
  BookOpen,
  Rocket,
  Users,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
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
        const resposta = await api.get(
          `/ofertas?pagina=${paginaAtual}&limite=3`,
        );

        setOfertas(resposta.data.dados);
        setTotalPaginas(resposta.data.paginacao.totalPaginas);
      } catch (erro) {
        console.error("Erro ao carregar ofertas", erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarOfertas();
  }, [paginaAtual]);

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

  const ofertasFiltradas = ofertas.filter((oferta) => {
    const termoBusca = busca.toLowerCase();
    const tituloMatch = oferta.titulo?.toLowerCase().includes(termoBusca);
    const descricaoMatch = oferta.descricao?.toLowerCase().includes(termoBusca);

    return tituloMatch || descricaoMatch;
  });

  const handleButtonGlowMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--cursor-x", `${x}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${y}px`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-6 md:py-8 lg:py-10">
        <div className="w-[calc(100%-2rem)] max-w-[1500px] mx-auto rounded-2xl bg-[#EAD7F1] border border-white/70 px-4 sm:px-6 md:px-10 py-12 md:py-16 lg:py-20 text-center shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-5">
            <img
              src="/logo.png"
              alt="AprendeAí"
              className="h-9 sm:h-10 md:h-12 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light/80 border border-brand/20 text-brand font-semibold text-sm mb-7 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>A maior plataforma de troca de habilidades</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto">
            Aprenda o que quiser,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark via-brand to-purple-700">
              ensinando o que sabe.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-3xl mb-8 md:mb-10 leading-relaxed mx-auto">
            Conecte-se com milhares de pessoas dispostas a compartilhar
            conhecimento. Adquira novos cursos e expanda seus horizontes de
            forma colaborativa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            {!user ? (
              <>
                <Link to="/cadastro" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    className="h-14 px-8 text-lg w-full rounded-xl shadow-lg shadow-brand/30 hover:shadow-brand/40 transition-all flex items-center justify-center gap-2"
                  >
                    Começar Gratuitamente <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  onClick={scrollToCursos}
                  onMouseMove={handleButtonGlowMove}
                  variant="secondary"
                  className="cursor-glow-btn h-14 px-8 text-lg w-full sm:w-auto rounded-xl border border-brand/20 bg-brand-light/40 text-brand flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Explorar Cursos
                  </span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    className="h-14 px-8 text-lg w-full rounded-xl shadow-lg shadow-brand/30 hover:shadow-brand/40 transition-all flex items-center justify-center gap-2"
                  >
                    Ir para meu Dashboard <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  onClick={scrollToCursos}
                  onMouseMove={handleButtonGlowMove}
                  variant="secondary"
                  className="cursor-glow-btn h-14 px-8 text-lg w-full sm:w-auto rounded-xl border border-brand/20 bg-brand-light/40 text-brand flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="relative z-10">Ver Novos Cursos</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {!user && (
        <section className="py-14 md:py-16 bg-slate-50">
          <div className="w-[calc(100%-2rem)] max-w-[1500px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Como funciona o AprendeAí?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Nossa plataforma foi desenhada para facilitar a conexão entre
                quem quer ensinar e quem deseja aprender.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brand-light/70 rounded-2xl flex items-center justify-center mb-6 text-brand">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  1. Crie seu perfil
                </h3>
                <p className="text-slate-600">
                  Cadastre-se rapidamente e conte para a comunidade o que você
                  domina e o que gostaria de aprender.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brand-light/70 rounded-2xl flex items-center justify-center mb-6 text-brand">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  2. Publique Ofertas
                </h3>
                <p className="text-slate-600">
                  Crie cursos ou mentorias sobre os assuntos que você tem
                  experiência. Ajude outras pessoas a crescerem.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-brand-light/70 rounded-2xl flex items-center justify-center mb-6 text-brand">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  3. Adquira Conhecimento
                </h3>
                <p className="text-slate-600">
                  Explore a vitrine de cursos e adquira novos conhecimentos
                  compartilhados por especialistas da comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="cursos"
        ref={cursosRef}
        className={`py-20 ${user ? "bg-slate-50" : "border-t border-slate-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Conhecimentos Disponíveis
              </h2>
              <p className="text-slate-600 text-lg">
                Explore os cursos oferecidos por nossa comunidade de
                especialistas.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por título ou assunto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all shadow-sm text-slate-700 placeholder-slate-400"
                />
              </div>
              <button
                className="w-full sm:w-auto p-3 bg-brand-light/30 border border-brand/20 rounded-xl text-brand hover:bg-brand-light/60 transition-colors shadow-sm flex items-center justify-center gap-2"
                title="Filtros avançados (em breve)"
              >
                <Filter className="w-5 h-5" />
                <span className="sm:hidden font-medium">Filtros</span>
              </button>
            </div>
          </div>

          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
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
          ) : ofertas.length === 0 ? (
            <div className="text-center py-24 bg-brand-light/20 rounded-3xl border border-brand/25 border-dashed">
              <BookOpen className="w-16 h-16 text-brand/55 mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                Nenhum conhecimento disponível ainda
              </h3>
              <p className="text-slate-600 text-lg">
                Seja o primeiro a compartilhar o que você sabe!
              </p>
              {!user && (
                <Link to="/cadastro" className="mt-8 inline-block">
                  <Button variant="primary" className="px-8 h-12 rounded-xl">
                    Criar minha conta agora
                  </Button>
                </Link>
              )}
            </div>
          ) : ofertasFiltradas.length === 0 ? (
            <div className="text-center py-16 bg-brand-light/10 rounded-3xl border border-brand/20 shadow-sm">
              <Search className="w-12 h-12 text-brand/55 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-slate-500">
                Não encontramos nenhum curso com o termo "{busca}".
              </p>
              <button
                onClick={() => setBusca("")}
                className="mt-6 text-brand font-medium hover:underline"
              >
                Limpar busca
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ofertasFiltradas.map((oferta) => (
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
                          ? "Faça Login para Adquirir"
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
      </section>

      {!user && (
        <section className="py-12 md:py-14">
          <div
            onMouseMove={handleButtonGlowMove}
            className="cursor-glow-section w-[calc(100%-2rem)] max-w-[1500px] mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10 text-center rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >

            <h2 className="relative text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Pronto para transformar sua carreira?
            </h2>
            <p className="relative text-slate-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Entre para a comunidade AprendeAí e impulsione seu futuro com trocas reais e conhecimento aplicado ao seu ritmo.
            </p>
            <div className="relative flex justify-center">
              <Link to="/cadastro" className="inline-flex">
              <Button
                variant="secondary"
                className="w-auto h-12 px-8 rounded-xl bg-white text-brand hover:!bg-cta-hover border border-brand/20 shadow-md transition-all"
              >
                <span className="relative z-10">Junte-se a nós</span>
              </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>
          © {new Date().getFullYear()} AprendeAí. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
