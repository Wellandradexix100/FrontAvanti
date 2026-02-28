import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, X, Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { CardOferta } from "../components/CardOferta";
import { Input } from "../components/Input";

export default function Dashboard() {
  const { user } = useAuth();
  const [minhasOfertas, setMinhasOfertas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalOfertaAberto, setModalOfertaAberto] = useState(false);
  const [ofertaEmEdicao, setOfertaEmEdicao] = useState(null);
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);

  const formOferta = useForm();
  const formPerfil = useForm();

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

  const abrirModalPerfil = () => {
    formPerfil.setValue("nome", user?.nome || "");
    formPerfil.setValue("telefone", user?.telefone || "");
    formPerfil.setValue("descricao", user?.descricao || "");
    setModalPerfilAberto(true);
  };

  const onSubmitPerfil = async (data) => {
    try {
      const resposta = await api.put(`/pessoas/${user.id}`, data);
      toast.success("Perfil atualizado com sucesso!");

      const dadosAtuais = JSON.parse(localStorage.getItem("@AvantiTroca:user"));
      const novosDados = { ...dadosAtuais, ...resposta.data };
      localStorage.setItem("@AvantiTroca:user", JSON.stringify(novosDados));

      setModalPerfilAberto(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error(error.response?.data?.erro || "Erro ao atualizar o perfil.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Olá, {user?.nome?.split(" ")[0]}!
            </h1>
            <p className="text-slate-600 mt-1">
              Gere os conhecimentos que estás a partilhar na plataforma.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <Link
              to="/"
              className="flex items-center justify-center font-semibold py-3 px-6 rounded-lg transition-colors bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 w-full sm:w-auto shadow-sm"
            >
              <Search className="w-5 h-5 mr-2" />
              Explorar Ofertas
            </Link>

            <Button
              onClick={abrirModalPerfil}
              variant="secondary"
              className="w-full sm:w-auto shadow-sm"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Editar Perfil
            </Button>

            <Button
              onClick={abrirModalNovaOferta}
              variant="primary"
              className="w-full sm:w-auto shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Oferta
            </Button>
          </div>
        </div>

        {carregando ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg animate-pulse">
              A procurar as tuas ofertas...
            </p>
          </div>
        ) : minhasOfertas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center">
            <p className="text-slate-500 text-lg mb-4">
              Ainda não criaste nenhuma oferta de conhecimento.
            </p>
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline flex items-center"
            >
              <Search className="w-4 h-4 mr-1" />
              Enquanto isso, que tal explorar o que outras pessoas estão a
              ensinar?
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {minhasOfertas.map((oferta) => (
              <CardOferta key={oferta.id} oferta={oferta}>
                <Button
                  onClick={() => abrirModalEditarOferta(oferta)}
                  variant="secondary"
                  className="flex-1 py-2 text-sm"
                >
                  <Edit className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button
                  onClick={() => handleDeleteOferta(oferta.id)}
                  variant="danger"
                  className="flex-1 py-2 text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Apagar
                </Button>
              </CardOferta>
            ))}
          </div>
        )}
      </div>

      {modalOfertaAberto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {ofertaEmEdicao ? "Editar Oferta" : "Criar Nova Oferta"}
              </h2>
              <button
                onClick={() => setModalOfertaAberto(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={formOferta.handleSubmit(onSubmitOferta)}
              className="p-6 flex flex-col gap-4"
            >
              <Input
                label="Título do Conhecimento"
                placeholder="Ex: Lógica de Programação Básica"
                error={formOferta.formState.errors.titulo?.message}
                {...formOferta.register("titulo", {
                  required: "O título é obrigatório",
                })}
              />

              <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-medium">Descrição</label>
                <textarea
                  className={`border p-3 rounded-lg outline-none transition-colors min-h-[100px] ${formOferta.formState.errors.descricao ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"}`}
                  placeholder="Explica o que vais ensinar..."
                  {...formOferta.register("descricao", {
                    required: "A descrição é obrigatória",
                  })}
                />
                {formOferta.formState.errors.descricao && (
                  <span className="text-red-500 text-sm">
                    {formOferta.formState.errors.descricao.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Categoria"
                  placeholder="Ex: Tecnologia, Música..."
                  error={formOferta.formState.errors.categoria?.message}
                  {...formOferta.register("categoria", {
                    required: "Obrigatório",
                  })}
                />

                <div className="flex flex-col gap-1">
                  <label className="text-slate-700 font-medium">Nível</label>
                  <select
                    className="border border-slate-300 p-3 rounded-lg outline-none focus:border-blue-500 bg-white"
                    {...formOferta.register("nivel", {
                      required: "Obrigatório",
                    })}
                  >
                    <option value="BASICO">Básico</option>
                    <option value="INTERMEDIARIO">Intermédio</option>
                    <option value="AVANCADO">Avançado</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
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

      {modalPerfilAberto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                Editar Perfil
              </h2>
              <button
                onClick={() => setModalPerfilAberto(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={formPerfil.handleSubmit(onSubmitPerfil)}
              className="p-6 flex flex-col gap-4"
            >
              <Input
                label="Nome Completo"
                error={formPerfil.formState.errors.nome?.message}
                {...formPerfil.register("nome", {
                  required: "O nome é obrigatório",
                })}
              />

              <Input
                label="Telefone"
                error={formPerfil.formState.errors.telefone?.message}
                {...formPerfil.register("telefone", {
                  required: "O telefone é obrigatório",
                })}
              />

              <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-medium">
                  Descrição / Biografia
                </label>
                <textarea
                  className="border border-slate-300 focus:border-blue-500 p-3 rounded-lg outline-none transition-colors min-h-[100px]"
                  placeholder="Fala um pouco sobre ti..."
                  {...formPerfil.register("descricao")}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalPerfilAberto(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={formPerfil.formState.isSubmitting}
                >
                  Atualizar Perfil
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
