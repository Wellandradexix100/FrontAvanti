import { createContext, useState, useContext } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storagedUser = localStorage.getItem("@AvantiTroca:user");
    const storagedToken = localStorage.getItem("@AvantiTroca:token");

    if (storagedUser && storagedToken) {
      return JSON.parse(storagedUser);
    }
    return null;
  });

  async function login(email, senha) {
    try {
      const response = await api.post("/login", { email, senha });
      const { token, usuario } = response.data;

      localStorage.setItem("@AvantiTroca:token", token);
      localStorage.setItem("@AvantiTroca:user", JSON.stringify(usuario));

      setUser(usuario);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login", error);
      throw error;
    }
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, logado: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
