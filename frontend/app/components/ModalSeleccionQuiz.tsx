import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

interface Tema {
  id: number;
  nombre: string;
}

interface Coleccion {
  id: number;
  titulo: string;
  descripcion?: string;
}

interface ModalSeleccionQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (puntajeUsuarioId: number, preguntas: any[]) => void;
}

export default function ModalSeleccionQuiz({
  isOpen,
  onClose,
  onStart,
}: ModalSeleccionQuizProps) {
  const { userId, token } = useAuth();

  const [temas, setTemas] = useState<Tema[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [temaId, setTemaId] = useState("");
  const [coleccionId, setColeccionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar temas al abrir el modal
  useEffect(() => {
    if (!isOpen) return;

    fetch("http://localhost:3000/api-alfi/temas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar temas");
        return res.json();
      })
      .then(setTemas)
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los temas");
      });
  }, [isOpen]);

  // Cargar colecciones cuando se selecciona un tema
  useEffect(() => {
    if (!temaId) {
      setColecciones([]);
      setColeccionId("");
      return;
    }

    fetch(`http://localhost:3000/api-alfi/colecciones/tema/${temaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar colecciones");
        return res.json();
      })
      .then(setColecciones)
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar las colecciones");
      });
  }, [temaId]);

  const handleIniciarPartida = async () => {
    if (!coleccionId || !userId) return;

    try {
      setLoading(true);
      setError(null);

      //primer endpoint que inicia la partida
      const res = await axios.post(
        "http://localhost:3000/api-alfi/game/start",
        {
          perfilId: String(userId),
          coleccionId: coleccionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //incluye el token en el header
          },
        },
      );

      const { puntajeUsuarioId, coleccion } = res.data;

      // Llamar al callback con los datos
      onStart(puntajeUsuarioId, coleccion);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError("Error al iniciar la partida. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-[#02734A] mb-6">
          Empieza a practicar
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Selector de Tema */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Selecciona un tema primero
          </label>
          <select
            value={temaId}
            onChange={(e) => setTemaId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#02734A] focus:border-[#02734A] outline-none text-black"
          >
            <option value="">Selecciona un tema</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Colección */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Selecciona el subtema que quieres practicar
          </label>
          <select
            value={coleccionId}
            onChange={(e) => setColeccionId(e.target.value)}
            disabled={!temaId || colecciones.length === 0}
            className="text-gray-900 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#02734A] focus:border-[#02734A] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona una colección</option>
            {colecciones.map((col) => (
              <option key={col.id} value={col.id}>
                {col.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleIniciarPartida}
            disabled={!coleccionId || loading}
            className="flex-1 px-6 py-3 bg-[#02734A] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando..." : "Comenzar"}
          </button>
        </div>
      </div>
    </div>
  );
}
