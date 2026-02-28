import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  UserCircle,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { CardOferta } from "../components/CardOferta";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";

export default function Dashboard() {
  const { user } = useAuth();
  const [minhasOfertas, setMinhasOfertas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalOfertaAberto, setModalOfertaAberto] = useState(false);
  const [ofertaEmEdicao, setOfertaEmEdicao] = useState(null);

  const formOferta = useForm();

  const carregarMinhasOfertas = async () => {
    try {
      const resposta = await api.get("/ofertas");
      const ofertasDoUsuario = resposta.data.filter(
        (oferta) => oferta.pessoa_id === user?.id,
      );
      setMinhasOfertas(ofertasDoUsuario);
    } catch (error) {
      console.error("Erro ao carregar ofertas:", error);
      toast.error("Não foi possível carregar as tuas ofertas.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (user?.id) carregarMinhasOfertas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const abrirModalNovaOferta = () => {
    setOfertaEmEdicao(null);
    formOferta.reset();
    setModalOfertaAberto(true);
  };

  const abrirModalEditarOferta = (oferta) => {
    setOfertaEmEdicao(oferta);
    formOferta.setValue("titulo", oferta.titulo);
    formOferta.setValue("descricao", oferta.descricao);
    formOferta.setValue("categoria", oferta.categoria);
    formOferta.setValue("nivel", oferta.nivel);
    setModalOfertaAberto(true);
  };

  const onSubmitOferta = async (data) => {
    try {
      if (ofertaEmEdicao) {
        await api.put(`/ofertas/${ofertaEmEdicao.id}`, data);
        toast.success("Oferta atualizada com sucesso!");
      } else {
        await api.post("/ofertas", data);
        toast.success("Nova oferta criada com sucesso!");
      }
      setModalOfertaAberto(false);
      carregarMinhasOfertas();
    } catch (error) {
      toast.error(
        error.response?.data?.erro || "Ocorreu um erro ao guardar a oferta.",
      );
    }
  };

  const handleDeleteOferta = async (id) => {
    if (!window.confirm("Tens a certeza que desejas apagar esta oferta?"))
      return;
    try {
      await api.delete(`/ofertas/${id}`);
      toast.success("Oferta apagada com sucesso!");
      carregarMinhasOfertas();
    } catch (error) {
      toast.error(error.response?.data?.erro || "Erro ao apagar a oferta.");
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-light rounded-full blur-3xl opacity-60"></div>

          <div className="flex items-center gap-5 relative z-10 w-full lg:w-auto">
            <div className="bg-brand-light p-4 rounded-full text-brand shrink-0">
              <UserCircle size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
                Olá, {user?.nome?.split(" ")[0]}!{" "}
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              </h1>
              <p className="text-slate-600 mt-1 text-sm md:text-base">
                Gere os conhecimentos que estás a partilhar na plataforma.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 relative z-10 mt-2 lg:mt-0 w-full lg:w-auto">
            <Link
              to="/"
              className="flex-1 lg:flex-none flex items-center justify-center font-medium py-2 px-4 rounded-lg transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4 mr-2 shrink-0" />
              Explorar
            </Link>

            <Button
              onClick={abrirModalNovaOferta}
              variant="primary"
              className="flex-1 lg:flex-none py-2 px-4 text-sm shadow-sm w-auto whitespace-nowrap inline-flex justify-center items-center"
            >
              <Plus className="w-4 h-4 mr-2 shrink-0" />
              Nova Oferta
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-800">
              Minhas Ofertas
            </h2>
            <span className="bg-slate-200 text-slate-700 py-0.5 px-2.5 rounded-full text-sm font-semibold ml-2">
              {!carregando ? minhasOfertas.length : "..."}
            </span>
          </div>

          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-slate-100 rounded-xl p-5 h-[240px] shadow-sm animate-pulse flex flex-col"
                >
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-slate-200 rounded-md w-2/3"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-5/6 mb-auto"></div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                    <div className="h-10 bg-slate-200 rounded-lg w-1/2"></div>
                    <div className="h-10 bg-slate-200 rounded-lg w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : minhasOfertas.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-20 px-6 flex flex-col items-center text-center">
              <div className="bg-brand-light p-6 rounded-full mb-6 text-brand">
                <BookOpen size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Nenhuma oferta criada
              </h3>
              <p className="text-slate-600 max-w-md mb-8">
                Ainda não partilhaste nenhum conhecimento. Que tal criares a tua
                primeira oferta ou explorares o que a comunidade está a ensinar?
              </p>
              <div className="flex justify-center w-full">
                <Button
                  onClick={abrirModalNovaOferta}
                  variant="primary"
                  className="py-2.5 px-6 w-auto inline-flex items-center justify-center flex-none"
                >
                  <Plus className="w-5 h-5 mr-2 shrink-0" />
                  Criar Primeira Oferta
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {minhasOfertas.map((oferta) => (
                <CardOferta key={oferta.id} oferta={oferta}>
                  <Button
                    onClick={() => abrirModalEditarOferta(oferta)}
                    variant="secondary"
                    className="flex-1 py-2 text-sm bg-slate-100 hover:bg-slate-200"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  <Button
                    onClick={() => handleDeleteOferta(oferta.id)}
                    variant="danger"
                    className="flex-1 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Apagar
                  </Button>
                </CardOferta>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalOfertaAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transition-all transform scale-100">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="text-brand w-5 h-5" />
                {ofertaEmEdicao ? "Editar Oferta" : "Criar Nova Oferta"}
              </h2>
              <button
                onClick={() => setModalOfertaAberto(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={formOferta.handleSubmit(onSubmitOferta)}
              className="p-6 flex flex-col gap-5"
            >
              <Input
                label="Título do Conhecimento"
                placeholder="Ex: Lógica de Programação Básica"
                error={formOferta.formState.errors.titulo?.message}
                {...formOferta.register("titulo", {
                  required: "O título é obrigatório",
                })}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 font-medium text-sm">
                  Descrição
                </label>
                <textarea
                  className={`border p-3 rounded-lg outline-none transition-all min-h-[120px] resize-none ${formOferta.formState.errors.descricao ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-slate-300 focus:border-brand focus:ring-1 focus:ring-brand"}`}
                  placeholder="Explica o que vais ensinar de forma clara..."
                  {...formOferta.register("descricao", {
                    required: "A descrição é obrigatória",
                  })}
                />
                {formOferta.formState.errors.descricao && (
                  <span className="text-red-500 text-sm font-medium">
                    {formOferta.formState.errors.descricao.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Categoria"
                  placeholder="Ex: Tecnologia..."
                  error={formOferta.formState.errors.categoria?.message}
                  {...formOferta.register("categoria", {
                    required: "Obrigatório",
                  })}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 font-medium text-sm">
                    Nível
                  </label>
                  <select
                    className="border border-slate-300 p-3 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all bg-white"
                    {...formOferta.register("nivel", {
                      required: "Obrigatório",
                    })}
                  >
                    <option value="BASICO">Básico</option>
                    <option value="INTERMEDIARIO">Intermediário</option>
                    <option value="AVANCADO">Avançado</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOfertaAberto(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={formOferta.formState.isSubmitting}
                >
                  {ofertaEmEdicao ? "Guardar Alterações" : "Criar Oferta"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
