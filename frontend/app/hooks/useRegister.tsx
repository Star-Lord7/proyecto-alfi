import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api-alfi";

export const useRegister = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");

  const [paisId, setPaisId] = useState("");
  const [segmentoId, setSegmentoId] = useState("");

  // Data de selects
  const [paises, setPaises] = useState<any[]>([]);
  const [segmentos, setSegmentos] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Comentado porque aun no estan los endpoints realizados
  // Obtener países
  // useEffect(() => {
  //   axios.get(`${API_URL}/paises`).then((res) => {
  //     setPaises(res.data);
  //   });
  // }, []);

  // Obtener segmentos
  // useEffect(() => {
  //   axios.get(`${API_URL}/segmentos`).then((res) => {
  //     setSegmentos(res.data);
  //   });
  // }, []);

  // Registrar el usuario
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/usuarios`, {
        email,
        password,
        confirmPassword,
        perfil: {
          nombre,
          apellido,
          edad: edad ? Number(edad) : undefined,
          telefono,
          paisId: Number(paisId),
          segmentoId: Number(segmentoId),
        },
      });

      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].message);
      } else {
        setError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    // form
    email,
    password,
    confirmPassword,
    nombre,
    apellido,
    edad,
    telefono,
    paisId,
    segmentoId,

    // setters
    setEmail,
    setPassword,
    setConfirmPassword,
    setNombre,
    setApellido,
    setEdad,
    setTelefono,
    setPaisId,
    setSegmentoId,

    // data
    paises,
    segmentos,

    // actions
    handleRegister,
    loading,
    error,
  };
};
