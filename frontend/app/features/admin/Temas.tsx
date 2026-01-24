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

  // estados para editar un tema
  const [showEditModal, setShowEditModal] = useState(false);
  const [temaSelec, setTemaSelec] = useState<Tema | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  // estados para eliminar un tema
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // funcion para mostrar el mensaje de exito
  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 3000);
  };

  // useEffect
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

  // funcion para actualizar un tema
  const handleUpdateTema = async () => {
    if (!temaSelec) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api-alfi/temas/${temaSelec.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: editNombre,
            descripcion: editDescripcion,
          }),
        }
      );

      if (res.ok) {
        showMessage("Tema actualizado exitosamente");
        setShowEditModal(false);
      } else {
        setError("Error al actualizar el tema");
      }
    } catch {
      setError("Error al actualizar el tema");
    }
  };

  // funcion para eliminar un tema
  const handleDeleteTema = async () => {
    if (!temaSelec) return;

    try {
      await fetch(`http://localhost:3000/api-alfi/temas/${temaSelec.id}`, {
        method: "DELETE",
      });

      setTemas((prev) => prev.filter((t) => t.id !== temaSelec.id));
      showMessage("Tema eliminado correctamente");
    } finally {
      setShowDeleteModal(false);
      setTemaSelec(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#02734A] px-6 lg:px-12 py-12">

      {/* VOLVER */}
      <Link
        to="/admin"
        className="inline-block mb-8 bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
      >
        Volver
      </Link>

      {/* HEADER */}
      <header className="text-center mb-12 text-white">
        <h1 className="text-4xl font-bold">Temas Disponibles</h1>
        <p className="opacity-90 mt-2">
          Explora los módulos disponibles para comenzar tu aprendizaje
        </p>
      </header>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-4 text-center mb-6">
          <p className="text-emerald-700 font-semibold">{message}</p>
        </div>
      )}

      {/* BOTONES */}
      <div className="flex justify-center md:justify-end gap-4 mb-10">
        <Link
          to="/admin/temas/crear"
          className="bg-white text-emerald-800 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          + Crear Tema
        </Link>

        <Link
          to="/admin/colecciones"
          className="bg-white text-emerald-800 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          Ver Colecciones
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-white opacity-80">
          Cargando temas...
        </p>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}

      {/* LIST */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {temas.map((tema) => (
            <div
              key={tema.id}
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

      {/* MODAL EDITAR */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-emerald-700 mb-4">
              Editar Tema
            </h2>

            <input
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <textarea
              value={editDescripcion}
              onChange={(e) => setEditDescripcion(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-6"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleUpdateTema}
                className="px-4 py-2 bg-emerald-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {showDeleteModal && temaSelec && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Eliminar tema
            </h2>

            <p className="mb-6">
              ¿Seguro que deseas eliminar <strong>{temaSelec.nombre}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleDeleteTema}
                className="px-4 py-2 bg-red-600 text-white rounded"
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
