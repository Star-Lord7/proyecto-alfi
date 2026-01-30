import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
interface Coleccion {
  id: number;
  titulo: string;
  descripcion: string;
  cantidad_tarjetas: number;
  estado: string;
  temaId: number;
}

interface Opcion {
  id: number;
  descripcion: string;
  feedback: string;
  es_correcta: boolean;
}

interface Tarjeta {
  id: number;
  pregunta: string;
  dificultad: string;
  opciones: Opcion[];
}

export default function CollectionCards() {
  const { id } = useParams(); // id = coleccionId
  const [coleccion, setColeccion] = useState<Coleccion | null>(null);
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener colección para poder mostrar su informacion
        const resColeccion = await fetch(
          `http://localhost:3000/api-alfi/colecciones/${id}`
        );
        if (!resColeccion.ok) throw new Error("Error al cargar colección");
        const coleccionData = await resColeccion.json();
        setColeccion(coleccionData);

        // Obtener tarjetas aprobadas
        const resTarjetas = await fetch(
          `http://localhost:3000/api-alfi/tarjetas/${id}`
        );
        if (!resTarjetas.ok) throw new Error("Error al cargar tarjetas");
        const tarjetasData = await resTarjetas.json();
        setTarjetas(tarjetasData);

      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
  return (
    <div className="min-h-screen bg-[#02734A] flex items-center justify-center text-white text-lg">
      Cargando...
    </div>
  );
}

  if (error || !coleccion) {
  return (
    <div className="min-h-screen bg-[#02734A] flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-md p-16 text-center">
        <p className="text-red-600 font-semibold mb-4 text-xl">
          Error
        </p>

        <p className="text-gray-600 text-lg">
          {error}
        </p>
      </div>
    </div>
  );
}

  return (
   <div className="min-h-screen bg-[#02734A] px-10 py-12">

      {/* HEADER */}
      <header className="mb-10">
        <Link
          to="/admin/colecciones"
className="bg-white px-5 py-2 rounded-lg shadow text-[#02734A] font-semibold hover:shadow-md transition"
        >
          ← Volver
        </Link>

<h1 className="text-3xl font-bold text-white mt-4">
          {coleccion.titulo}
        </h1>

<p className="text-emerald-100 mt-2 max-w-2xl">
          {coleccion.descripcion}
        </p>

<div className="flex gap-6 mt-4 text-sm text-emerald-100">
          <span> Tarjetas: {tarjetas.length}</span>
          <span> Estado: {coleccion.estado}</span>
        </div>
      </header>

      {/* EMPTY */}
      {tarjetas.length === 0 && (
<div className="max-w-3xl mx-auto bg-white rounded-xl p-12 shadow text-center">
          <p className="text-gray-600">
            No hay tarjetas aprobadas para esta colección.
          </p>
        </div>
      )}

      {/* LISTA DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tarjetas.map((tarjeta, index) => (
          <div
            key={tarjeta.id}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
              {index + 1}. {tarjeta.pregunta}
            </h2>

            <div className="space-y-3">
              {tarjeta.opciones.map((opcion) => (
                <div
                  key={opcion.id}
                  className={`border rounded-lg p-4 ${
                    opcion.es_correcta
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-gray-800">
                    {opcion.descripcion}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {opcion.feedback}
                  </p>

                  {opcion.es_correcta && (
                    <span className="inline-block mt-2 text-xs font-semibold text-emerald-700">
                      ✔ Respuesta correcta
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
