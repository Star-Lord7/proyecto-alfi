import { useState } from "react";
import { useNavigate } from "react-router"; //Hook para redirigir a otra página

export default function CrearTema() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api-alfi/temas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          estado: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al crear el tema");
      }

      // redirige a la lista de temas
      navigate("/admin/temas", {
        state: { message: "Tema creado exitosamente" },
      });
    } catch {
      setError("No se pudo crear el tema");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02734A] px-6 lg:px-12 py-12">

      {/* VOLVER */}
      <button
        onClick={() => navigate("/admin/temas")}
        className="inline-block mb-8 bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
      >
        Volver
      </button>

      {/* HEADER */}
      <header className="text-center mb-10 text-white">
        <h1 className="text-4xl font-bold">Crear Tema</h1>
        <p className="opacity-90 mt-2">
          Agrega un nuevo módulo de aprendizaje a la plataforma
        </p>
      </header>

      {/* CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre del tema
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-black"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm font-semibold">{error}</p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/temas")}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-800 transition disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Crear Tema"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
