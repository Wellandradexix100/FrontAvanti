import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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
    <div className="flex items-center justify-around min-h-screen bg-slate-50 p-8">
      <div className="mr-40 max-lg:hidden">
        <img 
        src="/img-cadastro.png" 
        alt="Imagem de cadastro"
        className="w-150 h-full" 
        />
      </div>
      <div className="p-8 mr-5 bg-white rounded-2xl shadow-xl w-full max-w-md max-lg:mr-0">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
          <div>
            <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome completo"
            error={errors.nome?.message}
            {...register("nome", { required: "O nome é obrigatório" })}
            />
          </div>

          <div>
            <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email", {
              required: "O e-mail é obrigatório",
            })}
            />
          </div>

          <div>
            <Input
            label="Telefone"
            type="text"
            placeholder="(00) 00000-0000"
            error={errors.telefone?.message}
            {...register("telefone", {
              required: "O telefone é obrigatório",
            })}
            />
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
            <Input
            label="Senha"
            type="password"
            placeholder="******"
            error={errors.senha?.message}
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: { value: 6, message: "No mínimo 6 caracteres" },
            })}
            />
          </div>
          <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </Button>
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
