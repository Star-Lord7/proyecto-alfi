import { useState } from "react";
import axios from "axios";

export type Rol = "SUPERADMIN" | "ADMIN" | "USUARIO";

interface User {
  id: number;
  email: string;
  rol: Rol;
}

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);
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

      // Guardar sesión
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return user; // devolvemos el user completo
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
    user,
    loading,
    error,
    handleLogin,
  };
};
