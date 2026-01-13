import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Tema {
  nombre: string;
  descripcion: string;
}

export default function Temas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api-alfi/temas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar los temas");
        }
        return response.json();
      })
      .then((data) => setTemas(data))
      .catch(() => setError("Ocurrió un error al cargar los temas"))
      .finally(() => setLoading(false));
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-200 px-10 py-12">
      <Link
          to="/admin"
          className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
        >
          Volver
        </Link>
      {/* HEADER */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-emerald-800">
          Temas Disponibles
        </h1>
        <p className="text-gray-600 mt-2">
          Explora los módulos disponibles para comenzar tu aprendizaje
        </p>
      </header>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center text-gray-600">
          Cargando temas...
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">
            Error
          </p>
          <p className="text-gray-600">
            {error}
          </p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && temas.length === 0 && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">
            No hay temas disponibles
          </h2>
          <p className="text-gray-600">
            Aún no se han publicado temas. Vuelve más tarde.
          </p>
        </div>
      )}

      {/* LIST */}
      {!loading && !error && temas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {temas.map((tema, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-emerald-700 mb-2">
                {tema.nombre}
              </h2>

              <p className="text-gray-600">
                {tema.descripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
