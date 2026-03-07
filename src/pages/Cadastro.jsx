import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PublicNavbar } from "../components/PublicNavbar";

export default function Cadastro() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: "USER" };

      await api.post("/pessoas", payload);
      toast.success("Conta criada com sucesso! Faça seu login.");
      navigate("/login");
    } catch (error) {
      const mensagemErro = error.response?.data?.erro || "Erro ao criar conta.";
      toast.error(mensagemErro);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />

      <div className="flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 gap-12 lg:gap-24">
        <div className="hidden lg:flex flex-1 justify-center items-center max-w-lg">
          <img
            src="/img-cadastro-roxo.png"
            alt="Imagem de cadastro"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-sm w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Criar Conta
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome completo"
              error={errors.nome?.message}
              {...register("nome", { required: "O nome é obrigatório" })}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email", { required: "O e-mail é obrigatório" })}
            />

            <Input
              label="Telefone"
              type="text"
              placeholder="(00) 00000-0000"
              error={errors.telefone?.message}
              {...register("telefone", { required: "O telefone é obrigatório" })}
            />

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Descrição (Opcional)
              </label>
              <textarea
                className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
                placeholder="Fale um pouco sobre você e o que gosta de ensinar..."
                {...register("descricao")}
                rows={3}
              />
            </div>

            <div className="w-full relative">
              <Input
                label="Senha"
                type={passwordVisible ? "text" : "password"}
                placeholder="******"
                error={errors.senha?.message}
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: { value: 8, message: "No mínimo 8 caracteres" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)/,
                    message: "A senha precisa ter letras e números",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 bottom-[14px] text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? "Criando conta..." : "Cadastrar"}
            </Button>
          </form>

          <p className="text-center text-slate-600 mt-6">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-cta-hover hover:underline font-semibold">
              Faça Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
