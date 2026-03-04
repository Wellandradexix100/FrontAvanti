import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {Input} from "../components/Input";
import { Button } from "../components/Button";
import {  FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [password, setPassword] = useState("");
  
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
    <div className="flex items-center justify-around min-h-screen bg-slate-50 p-8">
      <div className="mr-40 max-lg:hidden">
      <img 
      src="/img-login.png" 
      alt="Imagem de login"
      className="w-150 h-full" 
      />
      </div>
      <div className="p-8 mr-5 bg-white rounded-xl shadow-xl w-full max-w-md max-lg:mr-0">
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
          <FaUser className="absolute right-3 top-[51px] transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
          <div className="w-full relative">
            <Input
            label="Senha"
            type={password ? "text" : "password"}
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
          <div onClick={() => {setPassword (!password)}} >
            <FaEye className={password ? "hidden" : "absolute right-3 top-[51px] transform -translate-y-1/2 w-5 h-5 text-slate-400 cursor-pointer"}/>
            <FaEyeSlash className={password ? "absolute right-3 top-[51px] transform -translate-y-1/2 w-5 h-5 text-slate-400 cursor-pointer" : "hidden"}/>
          </div>
          </div>
          <Button 
          type="submit" 
          variant="primary"
          isLoading={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
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
