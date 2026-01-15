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
    
    <div className="min-h-screen bg-gray-200 px-10 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">Crear Tema</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              rows={4}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/temas")}
              className="px-4 py-2 rounded-lg border"
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
