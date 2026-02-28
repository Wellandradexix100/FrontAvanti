import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Entrar na Plataforma
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
              {...register("email", {
                required: "O e-mail é obrigatório",
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
            {errors.senha && (
              <span className="text-red-500 text-sm mt-1">
                {errors.senha.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2 disabled:bg-blue-400"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          Ainda não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-blue-600 hover:underline font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
