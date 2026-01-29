import { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth"; 

export type Rol = "SUPERADMIN" | "ADMIN" | "USUARIO";

interface User {
  id: number;
  email: string;
  rol: Rol;
}

export const useLogin = () => {
  const { login } = useAuth(); // USAR CONTEXT PARA PODER GUARDAR TOKEN Y USER ID
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "http://localhost:3000/api-alfi/auth/login",
        { email, password }
      );

      const { token, user } = res.data;

      // Guardar en context
      login(token, user);

      return user;
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Credenciales inválidas");
      } else {
        setError("Error del servidor. Intenta más tarde.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};