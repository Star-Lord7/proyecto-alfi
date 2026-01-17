import { useEffect, useState } from "react";
import { Link } from "react-router";

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
    <div className="min-h-screen bg-gray-200 px-10 py-12">
      <Link
        to="/admin/temas"
        className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition">
        Volver
      </Link>

      {/* HEADER */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-emerald-800">Colecciones</h1>
        <p className="text-gray-600 mt-2">
          Colecciones disponibles organizadas por tema
        </p>
      </header>

      {/* Filtro y Bton para crear */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 mt-6">
        {/* FILTRO */}
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-gray-700 mb-1">
            Filtrar por tema:
          </div>
          <select
            value={temaFiltro}
            onChange={(e) => setTemaFiltro(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-emerald-100 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="todos">Todos los temas</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* BOTÓN CREAR */}
        <button
          onClick={() => {
            setTitulo("");
            setDescripcion("");
            setTemaId("");
            setShowCreateModal(true);
          }}
          className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-emerald-800 transition self-start md:self-auto">
          + Crear Colección
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center text-gray-600">
          Cargando colecciones...
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
      {!loading && !error && colecciones.length === 0 && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">
            No hay colecciones
          </h2>
          <p className="text-gray-600">Aún no se han creado colecciones.</p>
        </div>
      )}

      {mensaje && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* {colecciones.map((coleccion) => ( */}
          {coleccionesFiltradas.map((coleccion) => (
            <div
              key={coleccion.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-emerald-700 mb-2">
                {coleccion.titulo}
              </h2>
              <p className="text-gray-600 mb-4">{coleccion.descripcion}</p>

              <div className="mt-4 space-y-3">
                <span className="inline-block bg-emerald-100 text-emerald-700 text-sm px-3 py-1 rounded-full font-semibold">
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
              <div className="flex justify-end gap-3 mt-6">
                {/* despues sera un Link para poder redirigir a otra pagina que muestre las tarjetas/preguntas de la coleccion */}
                <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition">
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
                  className="px-4 py-2 text-sm bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 transition">
                  Editar
                </button>

                {/* ELIMINAR */}
                <button
                  onClick={() => {
                    setColeccionSelec(coleccion);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal reutilizable para editar y crear una nueva collection */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-8">
            {/* HEADER */}
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
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
                  placeholder=""
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"/>
              </div>

              {/* DESCRIPCION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe brevemente el contenido de esta colección"
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"/>
              </div>

              {/* TEMA */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tema
                </label>
                <select
                  value={temaId}
                  onChange={(e) => setTemaId(Number(e.target.value))}
                  className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none">
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
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                    className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="ACTIVA">Activa</option>
                    <option value="INACTIVA">Inactiva</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                Cancelar
              </button>

              <button
                onClick={showEditModal ? handleUpdate : handleCreate}
                className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition">
                {showEditModal ? "Guardar cambios" : "Crear colección"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar */}
      {showDeleteModal && coleccionSelec && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Eliminar colección
            </h2>
            <p className="mb-6">
              ¿Esta seguro que desea eliminar la colección <strong>{coleccionSelec.titulo}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded">
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
