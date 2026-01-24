import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

interface Tema {
  id: number;
  nombre: string;
}

interface Coleccion {
  id: number;
  titulo: string;
  descripcion: string;
  cantidad_tarjetas: number;
  estado: string;
  temaId: number;
}

export default function Colecciones() {
  const navigate = useNavigate();
  const [temas, setTemas] = useState<Tema[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [temaFiltro, setTemaFiltro] = useState<string>("todos");

  //estados para los modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coleccionSelec, setColeccionSelec] = useState<Coleccion | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [temaId, setTemaId] = useState<number | "">("");
  const [cantidadTarjetas, setCantidadTarjetas] = useState<number>(0);
  const [estado, setEstado] = useState<string>("ACTIVA");

  //estados para los mensajes de exito o de error
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coleccionesRes, temasRes] = await Promise.all([
          fetch("http://localhost:3000/api-alfi/colecciones"),
          fetch("http://localhost:3000/api-alfi/temas"),
        ]);

        if (!coleccionesRes.ok || !temasRes.ok) {
          throw new Error("Error al cargar datos");
        }

        const coleccionesData = await coleccionesRes.json();
        const temasData = await temasRes.json();

        setColecciones(coleccionesData);
        setTemas(temasData);
      } catch (error) {
        setError("Ocurrio un error al cargar la informacion");
      } finally {
        setLoading(false); //
      }
    };

    fetchData(); //
  }, []);

  //obtenemos el nombre del tema para mostrarlo
  const getNombreTema = (temaId: number) => {
    const tema = temas.find((t) => t.id === temaId);
    return tema ? tema.nombre : "Tema desconocido";
  };

  //funcion para crear
  const handleCreate = async () => {
    // Validaciones
    if (!titulo.trim() || !descripcion.trim() || !temaId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");

      const res = await fetch("http://localhost:3000/api-alfi/colecciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          temaId: Number(temaId),
          cantidad_tarjetas: cantidadTarjetas,
          estado,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al crear la colección");
      }

      const nuevaColeccion = await res.json();
      console.log("respuesta del backend: ", nuevaColeccion);
      // Agregar la nueva colección al estado
      setColecciones((prev) => [...prev, nuevaColeccion]);

      setTipoMensaje("success");
      setMensaje("Colección creada correctamente");

      // Limpiar formulario
      setTitulo("");
      setDescripcion("");
      setTemaId("");
      setCantidadTarjetas(0);

      // Cerrar modal
      setShowCreateModal(false);

      // Borrar mensaje después de 3s
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error(error);
      setError("No se pudo crear la colección");
    } finally {
      setLoading(false);
    }
  };

  //funcion para editar
  const handleUpdate = async () => {
    if (!coleccionSelec) return;

    // Validaciones del formulario para que no se envie vacio
    if (!titulo.trim() || !descripcion.trim() || !temaId) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setMensaje("");

      const res = await fetch(
        `http://localhost:3000/api-alfi/colecciones/${coleccionSelec.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo,
            descripcion,
            temaId,
            cantidad_tarjetas: cantidadTarjetas,
            estado,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Error al actualizar la colección");
      }

      const coleccionActualizada = await res.json();
      setTipoMensaje("success");
      setMensaje("Colección actualizada correctamente");

      // Actualizar estado local
      setColecciones((prev) =>
        prev.map((c) =>
          c.id === coleccionSelec.id ? coleccionActualizada : c,
        ),
      );

      // Limpiar y cerrar
      setColeccionSelec(null);
      setShowEditModal(false);

      // Borrar mensaje después de 3s
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      setTipoMensaje("error");
      setMensaje("No se pudo actualizar la colección");
      // console.error(error);
      // setError("No se pudo actualizar la colección");
    } finally {
      setLoading(false);
    }
  };

  //funcion para eliminar
  const handleDelete = async () => {
    if (!coleccionSelec) return;
    try {
      setLoading(true);
      setMensaje("");

      const res = await fetch(
        `http://localhost:3000/api-alfi/colecciones/${coleccionSelec.id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Error al eliminar la colección");
      }

      // Remover del estado local
      setColecciones((prev) => prev.filter((c) => c.id !== coleccionSelec.id));

      // Limpiar y cerrar
      setColeccionSelec(null);
      setShowDeleteModal(false);

      setTipoMensaje("success");
      setMensaje("Colección eliminada correctamente");
    } catch (error) {
      setTipoMensaje("error");
      setMensaje("No se pudo eliminar la colección");
      // console.error(error);
      // setError("No se pudo eliminar la colección");
    } finally {
      setLoading(false);
    }
  };

  //para el filtro
  const coleccionesFiltradas =
    temaFiltro === "todos"
      ? colecciones
      : colecciones.filter((c) => c.temaId === Number(temaFiltro));

  return (
    <div className="min-h-screen bg-[#02734A] px-10 py-14 text-white">
      <Link
        to="/admin/temas"
        className="inline-flex items-center bg-white/90 px-5 py-2 rounded-xl shadow text-[#02734A] font-semibold hover:bg-white transition mb-10"
      >
        ← Volver
      </Link>

      {/* HEADER */}
      <header className="mb-14 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Colecciones
        </h1>
        <p className="text-emerald-100 mt-3 text-lg">
          Colecciones disponibles organizadas por tema
        </p>
      </header>

      {/* Filtro y Botón para crear */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        {/* FILTRO */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-emerald-100 mb-2">
            Filtrar por tema
          </label>
          <select
            value={temaFiltro}
            onChange={(e) => setTemaFiltro(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <option value="todos">Todos los temas</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          <button
            onClick={() => {
              setTitulo("");
              setDescripcion("");
              setTemaId("");
              setShowCreateModal(true);
            }}
            className="bg-white text-[#02734A] px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            + Crear Colección
          </button>

          {/* Boton para ver las preguntas */}
          <Link
            to="/admin/quizzes"
            className="bg-white/20 text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition"
          >
            Revisar Preguntas
          </Link>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center text-emerald-100 text-lg">
          Cargando colecciones...
        </div>
      )}
      {/* ERROR */}
      {error && !loading && (
        <div className="max-w-xl mx-auto bg-white/95 rounded-2xl shadow-xl p-6 text-center mb-10">
          <p className="text-red-600 font-semibold mb-2">Error</p>
          <p className="text-gray-700">{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && colecciones.length === 0 && (
        <div className="max-w-xl mx-auto bg-white/95 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#02734A] mb-3">
            No hay colecciones
          </h2>
          <p className="text-gray-700">
            Aún no se han creado colecciones.
          </p>
        </div>
      )}

      {mensaje && (
        <div
          className={`max-w-xl mx-auto mb-10 px-5 py-4 rounded-xl text-sm font-semibold text-center shadow-lg ${
            tipoMensaje === "success"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {mensaje}
        </div>
      )}

      {/* LIST */}
      {!loading && !error && colecciones.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* {colecciones.map((coleccion) => ( */ }
          {coleccionesFiltradas.map((coleccion) => (
            <div
              key={coleccion.id}
              className="bg-white/95 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <h2 className="text-xl font-bold text-[#02734A] mb-2">
                {coleccion.titulo}
              </h2>

              <p className="text-gray-700 mb-5">
                {coleccion.descripcion}
              </p>

              <div className="space-y-3">
                <span className="inline-block bg-emerald-100 text-[#02734A] text-sm px-4 py-1 rounded-full font-semibold">
                  {/* Tema: {coleccion.temaId} */}
                  Tema: {getNombreTema(coleccion.temaId)}
                </span>

                <div className="flex flex-wrap gap-3">
                  <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    {coleccion.cantidad_tarjetas} tarjetas
                  </span>

                  <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    Colección: {coleccion.estado}
                  </span>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap justify-end gap-3 mt-8">
                {/* boton para ver las preguntas aprobadas de una coleccion en especifico */}
                <button
                  className="bg-[#02734A] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-800 transition"
                  onClick={() =>
                    navigate(`/admin/colecciones/${coleccion.id}/quiz-aprobado`)
                  }
                >
                  Ver tarjetas
                </button>

                {/* EDITAR */}
                <button
                  onClick={() => {
                    setColeccionSelec(coleccion);
                    setTitulo(coleccion.titulo);
                    setDescripcion(coleccion.descripcion);
                    setTemaId(coleccion.temaId);
                    setCantidadTarjetas(coleccion.cantidad_tarjetas);
                    setEstado(coleccion.estado);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                >
                  Editar
                </button>

                {/* ELIMINAR */}
                <button
                  onClick={() => {
                    setColeccionSelec(coleccion);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal reutilizable para editar y crear una nueva collection */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8">
            {/* HEADER */}
            <h2 className="text-2xl font-extrabold text-[#02734A] mb-6 text-center">
              {showEditModal ? "Editar colección" : "Nueva colección"}
            </h2>

            {/* FORM */}
            <div className="space-y-5">
              {/* TITULO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Título de la colección
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none border-gray-300 text-black"
                />
              </div>

              {/* DESCRIPCION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  className="w-full border rounded-xl px-4 py-2 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none border-gray-300 text-black"
                />
              </div>

              {/* TEMA */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tema
                </label>
                <select
                  value={temaId}
                  onChange={(e) => setTemaId(Number(e.target.value))}
                  className="w-full border rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none border-gray-300 text-black"
                >
                  <option value="">Selecciona un tema</option>
                  {temas.map((tema) => (
                    <option key={tema.id} value={tema.id}>
                      {tema.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CANTIDAD DE TARJETAS*/}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Cantidad de tarjetas
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={cantidadTarjetas}
                    onChange={(e) =>
                      setCantidadTarjetas(Number(e.target.value))
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none border-gray-300 text-black"
                  />
                </div>

                {/* ESTADO */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={estado}
                    onChange={(e) =>
                      setEstado(e.target.value as "ACTIVA" | "INACTIVA")
                    }
                    className="w-full border rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none border-gray-300 text-black"
                  >
                    <option value="ACTIVA">Activa</option>
                    <option value="INACTIVA">Inactiva</option>
                  </select>
                </div>
              </div>
            </div>
            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Cancelar
              </button>

              <button
                onClick={showEditModal ? handleUpdate : handleCreate}
                className="px-6 py-2.5 rounded-xl bg-[#02734A] text-white font-semibold hover:bg-emerald-800 transition shadow-md"
              >
                {showEditModal ? "Guardar cambios" : "Crear colección"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar */}
      {showDeleteModal && coleccionSelec && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Eliminar colección
            </h2>

            <p className="mb-8 text-center text-gray-700">
              ¿Estás seguro de que deseas eliminar la colección
              <br />
              <strong className="text-gray-900">
                "{coleccionSelec.titulo}"
              </strong>
              ?
              <br />
              <span className="text-sm text-gray-500">
                Esta acción no se puede deshacer.
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
