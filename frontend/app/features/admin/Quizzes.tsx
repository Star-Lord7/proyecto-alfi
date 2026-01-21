import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useGenerarTarjeta } from "../../hooks/useGenerarTarjeta";
import { ModalCrearTarjeta } from "../../components/ModalCrearTarjeta";

interface Opcion {
  id: number;
  descripcion: string;
  feedback: string;
  es_correcta: boolean;
  puntos: number;
}

interface Tarjeta {
  id: number;
  pregunta: string;
  imagen: string | null;
  dificultad: string;
  estado: string;
  opciones: Opcion[];
}

type EstadoFiltro = "PENDIENTE_REVISION" | "APROBADA" | "RECHAZADA";

export default function RevisarTarjetas() {
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultadoAccion, setResultadoAccion] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estadoFiltro, setEstadoFiltro] =
    useState<EstadoFiltro>("PENDIENTE_REVISION");
  const [tarjetaSeleccionada, setTarjetaSeleccionada] =
    useState<Tarjeta | null>(null);

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const {
  temas,
  colecciones,
  temaId,
  setTemaId,
  coleccionId,
  setColeccionId,
  segmento,
  setSegmento,
  dificultad,
  setDificultad,
  handleCrearTarjeta,
  mensaje,
} = useGenerarTarjeta();

  //consulta las tarjetas segun su estado
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:3000/api-alfi/tarjetas/revisar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: estadoFiltro,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar las tarjetas");
        }
        return res.json();
      })
      .then((data) => setTarjetas(data))
      .catch(() => setError("Ocurrió un error al cargar las tarjetas"))
      .finally(() => setLoading(false));
  }, [estadoFiltro]);

  //funcion para cambiar el estado de una tarjeta
  const handleChangeEstado = async (nuevoEstado: "APROBADA" | "RECHAZADA") => {
    if (!tarjetaSeleccionada) return;

    try {
      const res = await fetch(
        "http://localhost:3000/api-alfi/tarjetas/estado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: tarjetaSeleccionada.id,
            nuevoEstado,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Error al actualizar el estado");
      }

      setResultadoAccion({
        success: true,
        message: `Tarjeta ${nuevoEstado.toLowerCase()} correctamente`,
      });

      // cerrar modal principal
      setTarjetaSeleccionada(null);

      // opcional: refrescar lista
      setTarjetas((prev) =>
        prev.filter((t) => t.id !== tarjetaSeleccionada.id),
      );
    } catch (error) {
      setResultadoAccion({
        success: false,
        message: "No se pudo actualizar el estado de la tarjeta",
      });
    }
  };

  const handleGuardarEdicion = async () => {
    if (!tarjetaSeleccionada) return;

    const res = await fetch(
      `http://localhost:3000/api-alfi/tarjetas/${tarjetaSeleccionada.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: tarjetaSeleccionada.pregunta,
          opciones: tarjetaSeleccionada.opciones.map((o) => ({
            id: o.id,
            descripcion: o.descripcion,
            feedback: o.feedback,
          })),
        }),
      },
    );

    if (!res.ok) {
      console.error("Error al guardar los cambios", await res.text());
      return;
    }

    setModoEdicion(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 px-10 py-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-emerald-800">
            Revisión de Tarjetas
          </h1>
          <p className="text-gray-600 mt-1">
            Tarjetas pendientes de validación
          </p>
        </div>

        <Link
          to="/admin"
          className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
        >
          Volver
        </Link>
      </header>

      <div className="flex justify-between items-center mb-8">
        {/* FILTER BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={() => setEstadoFiltro("PENDIENTE_REVISION")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              estadoFiltro === "PENDIENTE_REVISION"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            Pendientes
          </button>

          <button
            onClick={() => setEstadoFiltro("APROBADA")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              estadoFiltro === "APROBADA"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-700"
            }`}
          >
            Aprobadas
          </button>

          <button
            onClick={() => setEstadoFiltro("RECHAZADA")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              estadoFiltro === "RECHAZADA"
                ? "bg-red-600 text-white"
                : "bg-white text-red-700"
            }`}
          >
            Rechazadas
          </button>
        </div>

        {/* boton crear tarjeta */}
        <button
          onClick={() => setMostrarModalCrear(true)}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          + Crear tarjeta
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center text-gray-600">
          Cargando tarjetas...
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && tarjetas.length === 0 && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">
            No hay tarjetas pendientes
          </h2>
          <p className="text-gray-600">
            Todas las tarjetas han sido revisadas.
          </p>
        </div>
      )}

      {/* LIST */}
      {!loading && !error && tarjetas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tarjetas.map((tarjeta) => (
            <div
              key={tarjeta.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-emerald-700 mb-3">
                {tarjeta.pregunta}
              </h2>

              {/* <div className="text-sm text-gray-600 mb-4 space-y-1">
                {tarjeta.pregunta && <p>Tema: {tarjeta.pregunta}</p>}
                {tarjeta.coleccion && (
                  <p>Colección: {tarjeta.coleccion}</p>
                )}
              </div> */}

              <button
                onClick={() => setTarjetaSeleccionada(tarjeta)}
                className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}

      {tarjetaSeleccionada && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 relative flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 border-b">
              <button
                onClick={() => setTarjetaSeleccionada(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-emerald-800">
                Revisión de Tarjeta
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Dificultad:{" "}
                <span className="font-semibold">
                  {tarjetaSeleccionada.dificultad}
                </span>
              </p>
            </div>

            {/* Pregunta */}
            <div className="p-6 overflow-y-auto flex-1">
              {modoEdicion ? (
                <textarea
                  value={tarjetaSeleccionada.pregunta}
                  onChange={(e) =>
                    setTarjetaSeleccionada({
                      ...tarjetaSeleccionada,
                      pregunta: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 text-black"
                />
              ) : (
                <p className="text-base font-semibold text-black mb-4">
                  {tarjetaSeleccionada.pregunta}
                </p>
              )}

              {tarjetaSeleccionada.opciones.map((opcion, index) => (
                <div
                  key={opcion.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  {modoEdicion ? (
                    <>
                      <input
                        value={opcion.descripcion}
                        onChange={(e) => {
                          const nuevasOpciones = [
                            ...tarjetaSeleccionada.opciones,
                          ];
                          nuevasOpciones[index].descripcion = e.target.value;

                          setTarjetaSeleccionada({
                            ...tarjetaSeleccionada,
                            opciones: nuevasOpciones,
                          });
                        }}
                        className="w-full border rounded p-2 text-black"
                      />

                      <textarea
                        value={opcion.feedback}
                        onChange={(e) => {
                          const nuevasOpciones = [
                            ...tarjetaSeleccionada.opciones,
                          ];
                          nuevasOpciones[index].feedback = e.target.value;

                          setTarjetaSeleccionada({
                            ...tarjetaSeleccionada,
                            opciones: nuevasOpciones,
                          });
                        }}
                        className="w-full border rounded p-2 text-black"
                      />
                    </>
                  ) : (
                    <>
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

                        <span
                          className={`inline-block mt-2 text-xs font-semibold ${
                            opcion.es_correcta
                              ? "text-emerald-700"
                              : "text-red-600"
                          }`}
                        >
                          {opcion.es_correcta
                            ? "✔ Respuesta correcta"
                            : "✘ Respuesta incorrecta"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* <div className="space-y-3">
                        {tarjetaSeleccionada.opciones.map((opcion) => (
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

                            <span
                            className={`inline-block mt-2 text-xs font-semibold ${
                                opcion.es_correcta ? "text-emerald-700" : "text-red-600"
                            }`}
                            >
                            {opcion.es_correcta ? "✔ Respuesta correcta" : "✘ Respuesta incorrecta"}
                            </span>
                        </div>
                        ))}
                    </div> */}
            </div>

            {estadoFiltro === "APROBADA" && !modoEdicion && (
              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setModoEdicion(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Editar
                </button>
              </div>
            )}

            {/* Acciones */}
            {estadoFiltro === "PENDIENTE_REVISION" && (
              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => handleChangeEstado("RECHAZADA")}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Rechazar
                </button>

                <button
                  onClick={() => handleChangeEstado("APROBADA")}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Aprobar
                </button>
              </div>
            )}

            {modoEdicion && (
              <div className="p-6 border-t flex justify-end gap-4">
                <button
                  onClick={() => setModoEdicion(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleGuardarEdicion}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Guardar cambios
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {resultadoAccion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2
              className={`text-xl font-bold mb-2 ${
                resultadoAccion.success ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {resultadoAccion.success ? "Acción completada" : "Error"}
            </h2>

            <p className="text-gray-700 mb-6">{resultadoAccion.message}</p>

            <button
              onClick={() => setResultadoAccion(null)}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal para crear tarjeta */}
      <ModalCrearTarjeta
        mostrar={mostrarModalCrear}
        onClose={() => setMostrarModalCrear(false)}
        temas={temas}
        colecciones={colecciones}
        temaId={temaId}
        setTemaId={setTemaId}
        coleccionId={coleccionId}
        setColeccionId={setColeccionId}
        segmento={segmento}
        setSegmento={setSegmento}
        dificultad={dificultad}
        setDificultad={setDificultad}
        onCrear={handleCrearTarjeta}
        mensaje={mensaje}
      />
    </div>
  );
}
