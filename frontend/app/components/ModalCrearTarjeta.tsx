interface Props {
  mostrar: boolean;
  onClose: () => void;

  temas: { id: number; nombre: string }[];
  colecciones: { id: number; titulo: string }[];

  temaId: number | "";
  setTemaId: (v: number | "") => void;

  coleccionId: number | "";
  setColeccionId: (v: number | "") => void;

  segmento: string;
  setSegmento: (v: string) => void;

  dificultad: string;
  setDificultad: (v: string) => void;

  onCrear: () => void;

  mensaje: {
    tipo: "loading" | "success" | "error";
    texto: string;
  } | null;
}

export const ModalCrearTarjeta = ({
  mostrar,
  onClose,
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
  onCrear,
  mensaje,
}: Props) => {
  if (!mostrar) return null;

  const loading = mensaje?.tipo === "loading";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Creación de tarjeta / pregunta
        </h2>

        {/* Tema */}
        <p className="text-sm text-gray-600 mb-1">
          Primero debe seleccionar un tema
        </p>
        <select
          value={temaId}
          onChange={(e) => {
            const value = e.target.value;
            setTemaId(value ? Number(value) : "");
            setColeccionId("");
          }}
          className="w-full border rounded p-2 mb-3"
        >
          <option value="">Seleccione un tema</option>
          {temas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>

        {/* Colección */}
        <p className="text-sm text-gray-600 mb-1">
          Seleccione la colección según el tema elegido
        </p>
        <select
          value={coleccionId}
          onChange={(e) => {
            const value = e.target.value;
            setColeccionId(value ? Number(value) : "");
          }}
          disabled={!temaId}
          className="w-full border rounded p-2 mb-3 disabled:bg-gray-100"
        >
          <option value="">Seleccione colección</option>
          {colecciones.map((c) => (
            <option key={c.id} value={c.id}>
              {c.titulo}
            </option>
          ))}
        </select>

        {/* Segmento */}
        <p className="text-sm text-gray-600 mb-1">
          Seleccione el segmento de usuario
        </p>
        <select
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        >
          <option value="">Seleccione segmento</option>
          <option value="NIÑO">Niño</option>
          <option value="JOVEN_ADULTO">Joven adulto</option>
          <option value="ADULTO">Adulto</option>
        </select>

        {/* Dificultad */}
        <p className="text-sm text-gray-600 mb-1">
          Seleccione el nivel de dificultad
        </p>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="BASICO">Básico</option>
          <option value="INTERMEDIO">Intermedio</option>
          <option value="AVANZADO">Avanzado</option>
        </select>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`mb-4 text-sm font-semibold text-center p-2 rounded-lg ${
              mensaje.tipo === "loading"
                ? "bg-blue-100 text-blue-700"
                : mensaje.tipo === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <button
          onClick={onCrear}
          disabled={loading || !coleccionId || !segmento}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Generando..." : "Generar tarjeta"}
        </button>
      </div>
    </div>
  );
};
