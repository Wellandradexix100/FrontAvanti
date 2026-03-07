import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PublicNavbar } from "../components/PublicNavbar";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.senha);
      toast.success("Bem-vindo de volta!");
    } catch (error) {
      const mensagemErro =
        error.response?.data?.erro || "Erro ao fazer login. Tente novamente.";
      toast.error(mensagemErro);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />

      <div className="flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 gap-12 lg:gap-24">
        <div className="hidden lg:flex flex-1 justify-center items-center max-w-lg">
          <img
            src="/img-login-roxo.png"
            alt="Imagem de login"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="p-8 bg-white rounded-xl shadow-sm w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="w-full relative">
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                error={errors.email?.message}
                {...register("email", {
                  required: "O e-mail é obrigatório",
                })}
              />
              <FaUser className="absolute right-3 bottom-[14px] w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            <div className="w-full relative">
              <Input
                label="Senha"
                type={passwordVisible ? "text" : "password"}
                placeholder="******"
                error={errors.senha?.message}
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-slate-600 mt-6">
            Ainda não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-cta-hover hover:underline font-semibold"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
