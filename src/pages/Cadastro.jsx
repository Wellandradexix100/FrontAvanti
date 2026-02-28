import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cadastro() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && (
              <span className="text-red-500 text-sm mt-1">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              E-mail
            </label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
              {...register("email", { required: "O e-mail é obrigatório" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Telefone
            </label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
              {...register("telefone", {
                required: "O telefone é obrigatório",
              })}
            />
            {errors.telefone && (
              <span className="text-red-500 text-sm mt-1">
                {errors.telefone.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Descrição (Opcional)
            </label>
            <textarea
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="Fale um pouco sobre você e o que gosta de ensinar..."
              {...register("descricao")}
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: { value: 6, message: "No mínimo 6 caracteres" },
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2 disabled:bg-green-400"
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
