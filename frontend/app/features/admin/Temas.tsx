import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

interface Tema {
  id: number;
  nombre: string;
  descripcion: string;
}

export default function Temas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);

  //estados para editar un tema
  const [showEditModal, setShowEditModal] = useState(false);
  const [temaSelec, setTemaSelec] = useState<Tema | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  //estados para eliminar un tema
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //funcion para mostrar el mensaje de exito
  const showMessage = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  //useEffect
  useEffect(() => {
    if (location.state?.message) {
      showMessage(location.state.message);
    }

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
  }, [location.state]);

  //funcion para actualizar un tema
  const handleUpdateTema = async () => {
    if (!temaSelec) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api-alfi/temas/${temaSelec.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: editNombre,
            descripcion: editDescripcion,
          }),
        },
      );
      if (res.ok) {
        const updatedTema = await res.json();
        setTemas(temas.map((t) => (t.id === temaSelec.id ? updatedTema : t)));
        showMessage("Tema actualizado exitosamente");
        setShowEditModal(false);
        setTemaSelec(null); // Limpiar tema seleccionado

        //recargar la lista de temas
        const refreshedRes = await fetch(
          "http://localhost:3000/api-alfi/temas",
        );
        const refreshedData = await refreshedRes.json();
        setTemas(refreshedData);
      } else {
        setError("Error al actualizar el tema");
      }
    } catch (err) {
      setError("Error al actualizar el tema");
    }
  };

  //funcion para eliminar un tema
  const handleDeleteTema = async () => {
    if (!temaSelec) return;

    try {
      await fetch(`http://localhost:3000/api-alfi/temas/${temaSelec.id}`, {
        method: "DELETE",
      });

      setTemas((prev) => prev.filter((t) => t.id !== temaSelec.id));
      showMessage("Tema eliminado correctamente");
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setTemaSelec(null);
    }
  };

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

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="alert alert-success max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center mb-6">
          <p className="text-green-600 font-semibold">{message}</p>
        </div>
      )}

      {/* Boton para crear un nuevo tema */}
      <div className="flex justify-center md:justify-end gap-4 mb-10 mt-6">
        <Link
          to="/admin/temas/crear"
          className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-emerald-800 transition"
        >
          + Crear Tema
        </Link>

        <Link
          to="/admin/colecciones"
          className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-emerald-800 transition"
        >
          Ver Colecciones
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center text-gray-600">
          Cargando temas...
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
              <p className="text-gray-600">{tema.descripcion}</p>

              <div className="flex justify-end gap-3 mt-6">
                {/* EDITAR */}
                <button
                  onClick={() => {
                    setTemaSelec(tema);
                    setEditNombre(tema.nombre);
                    setEditDescripcion(tema.descripcion);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Editar
                </button>

                {/* VER QUIZZES */}
                {/* <Link
                  to={`/admin/temas/${tema.id}/colecciones`}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  Ver quizzes
                </Link> */}

                {/* ELIMINAR */}
                <button
                  onClick={() => {
                    setTemaSelec(tema);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL PARA EDITAR TEMA */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">
              Editar Tema
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre</label>
              <input
                value={editNombre}
                onChange={(e) => setEditNombre(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1">
                Descripción
              </label>
              <textarea
                value={editDescripcion}
                onChange={(e) => setEditDescripcion(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={handleUpdateTema}
                className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA ELIMINAR UN TEMA */}
      {showDeleteModal && temaSelec && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Eliminar tema
            </h2>

            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que desea eliminar el tema
              <strong> "{temaSelec.nombre}"</strong>? <br />
              <br />
              Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteTema}
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
