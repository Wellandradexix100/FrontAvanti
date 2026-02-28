/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { Camera, Lock, UserCircle, Shield, Mail } from "lucide-react";

import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function Perfil() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formDados = useForm({
    defaultValues: {
      nome: user?.nome || "",
      telefone: user?.telefone || "",
      descricao: user?.descricao || "",
    },
  });

  const formSenha = useForm();

  const onSubmitDados = async (data) => {
    setIsSubmitting(true);
    try {
      const resposta = await api.put(`/pessoas/${user.id}`, data);
      toast.success("Perfil atualizado com sucesso!");

      const dadosAtuais = JSON.parse(localStorage.getItem("@AvantiTroca:user"));
      const novosDados = { ...dadosAtuais, ...resposta.data };
      localStorage.setItem("@AvantiTroca:user", JSON.stringify(novosDados));

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error(error.response?.data?.erro || "Erro ao atualizar perfil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileInputRef = useRef(null);

  const onSubmitSenha = async (data) => {
    if (data.novaSenha !== data.confirmarSenha) {
      formSenha.setError("confirmarSenha", {
        message: "As palavras-passe não coincidem",
      });
      return;
    }

    try {
      await api.post(`/trocar-senha/${user.id}`, {
        senhaAtual: data.senhaAtual,
        novaSenha: data.novaSenha,
      });

      toast.success("Palavra-passe atualizada com sucesso!");
      formSenha.reset();
    } catch (error) {
      toast.error(
        error.response?.data?.erro || "Erro ao atualizar a palavra-passe.",
      );
    }
  };

  const handleFotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const resposta = await api.post(`/upload/avatar/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Foto de perfil atualizada!");

      const dadosAtuais = JSON.parse(localStorage.getItem("@AvantiTroca:user"));
      const novosDados = {
        ...dadosAtuais,
        avatar_url: resposta.data.avatar_url,
      };
      localStorage.setItem("@AvantiTroca:user", JSON.stringify(novosDados));

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Erro ao enviar a imagem.");
    }
  };

  const capaInputRef = useRef(null);

  const handleCapaClick = () => {
    capaInputRef.current?.click();
  };

  const handleCapaChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const resposta = await api.post(`/upload/capa/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Foto de capa atualizada!");

      const dadosAtuais = JSON.parse(localStorage.getItem("@AvantiTroca:user"));
      const novosDados = { ...dadosAtuais, capa_url: resposta.data.capa_url };
      localStorage.setItem("@AvantiTroca:user", JSON.stringify(novosDados));

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Erro ao enviar a imagem de capa.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative rounded-3xl shadow-lg overflow-hidden mb-8 flex flex-col justify-end">
          <input
            type="file"
            ref={capaInputRef}
            onChange={handleCapaChange}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFotoChange}
            accept="image/*"
            className="hidden"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand to-blue-400 z-0">
            {user?.capa_url && (
              <img
                src={user.capa_url}
                alt="Capa"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          </div>

          <button
            onClick={handleCapaClick}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer z-20 border border-white/20 shadow-lg"
          >
            <Camera className="w-4 h-4" />
            Alterar Capa
          </button>

          <div className="relative z-10 w-full bg-white/10 backdrop-blur-md border-t border-white/20 px-6 sm:px-10 pt-6 sm:pt-8 pb-8 mt-32 sm:mt-48">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
              <div className="group relative shrink-0 -mt-20 sm:-mt-28">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-100/10 rounded-full border-4 border-white/30 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-24 h-24 sm:w-28 sm:h-28 text-white/80" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleFotoClick}
                  className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                >
                  <Camera className="w-7 h-7 mb-1" />
                  <span className="text-sm font-semibold">Trocar</span>
                </button>
              </div>

              <div className="flex-1 w-full sm:w-auto text-center sm:text-left pb-0 sm:pb-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                  {user?.nome || "Carregando..."}
                </h1>
                <p className="text-blue-50 flex items-center justify-center sm:justify-start gap-2 mt-2 font-medium text-base sm:text-lg drop-shadow">
                  <Mail className="w-5 h-5 opacity-90" />
                  {user?.email || "email@exemplo.com"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <UserCircle className="w-6 h-6 text-brand" />
                <h2 className="text-xl font-bold text-slate-800">
                  Informações Pessoais
                </h2>
              </div>

              <form
                onSubmit={formDados.handleSubmit(onSubmitDados)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Nome Completo"
                    error={formDados.formState.errors.nome?.message}
                    {...formDados.register("nome", { required: "Obrigatório" })}
                  />
                  <Input
                    label="Telefone (WhatsApp)"
                    error={formDados.formState.errors.telefone?.message}
                    {...formDados.register("telefone", {
                      required: "Obrigatório",
                    })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 font-medium text-sm">
                    Sobre mim (Biografia)
                  </label>
                  <textarea
                    className="border border-slate-300 p-3 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all min-h-[120px] resize-none"
                    placeholder="Conte para a comunidade o que você gosta de aprender e ensinar..."
                    {...formDados.register("descricao")}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" isLoading={isSubmitting}>
                    Salvar Informações
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Shield className="w-6 h-6 text-brand" />
                <h2 className="text-xl font-bold text-slate-800">Segurança</h2>
              </div>

              <form
                onSubmit={formSenha.handleSubmit(onSubmitSenha)}
                className="space-y-4"
              >
                <Input
                  type="password"
                  label="Senha Atual"
                  placeholder="••••••••"
                  error={formSenha.formState.errors.senhaAtual?.message}
                  {...formSenha.register("senhaAtual", {
                    required: "Obrigatório",
                  })}
                />

                <Input
                  type="password"
                  label="Nova Senha"
                  placeholder="••••••••"
                  error={formSenha.formState.errors.novaSenha?.message}
                  {...formSenha.register("novaSenha", {
                    required: "Obrigatório",
                    minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                  })}
                />

                <Input
                  type="password"
                  label="Confirmar Nova Senha"
                  placeholder="••••••••"
                  error={formSenha.formState.errors.confirmarSenha?.message}
                  {...formSenha.register("confirmarSenha", {
                    required: "Obrigatório",
                  })}
                />

                <div className="pt-2">
                  <Button type="submit" variant="secondary" className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
