import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Rol = "SUPERADMIN" | "ADMIN" | "USUARIO";

interface User {
  id: number;
  email: string;
  rol: Rol;
}

// Definición del contexto de autenticación
interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

//Sirve para compartir el estado de autenticacion en toda la pagina
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    //si hay token y user en el localstorage, los seteamos en el estado
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //inicia sesion
  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  //cierra sesion y limpia el localstorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId: user?.id ?? null,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};