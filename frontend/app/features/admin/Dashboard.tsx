import { Link } from "react-router";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-300 px-10 py-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-14">
        <div>
          <h1 className="text-5xl font-bold text-emerald-800">
            Panel de Administración
          </h1>
          <p className="text-gray-600 mt-2">
            Control y gestión de la plataforma ALFI
          </p>
        </div>

        <Link
          to="/"
          className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
        >
          Volver al inicio
        </Link>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Usuarios activos</p>
          <h3 className="text-4xl font-bold text-emerald-800">128</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Quizzes creados</p>
          <h3 className="text-4xl font-bold text-emerald-800">24</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Intentos totales</p>
          <h3 className="text-4xl font-bold text-emerald-800">1,542</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Tasa de aprobación</p>
          <h3 className="text-4xl font-bold text-emerald-800">76%</h3>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* PLATFORM STATUS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">
            Estado de la plataforma
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Finanzas personales</span>
                <span>92% completado</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[92%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Inversiones</span>
                <span>68% completado</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[68%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Crédito y deuda</span>
                <span>74% completado</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[74%]" />
              </div>
            </div>
          </div>
        </div>

        {/* ADMIN ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">
            Acciones administrativas
          </h2>

          <div className="flex flex-col gap-4">
            <Link
              to="/admin/temas"
              className="bg-emerald-700 text-white text-center py-3 rounded-xl font-semibold hover:bg-emerald-800 transition"
            >
              Gestionar Temas
            </Link>

            <Link
              to="/admin/quizzes"
              className="border border-emerald-700 text-emerald-700 text-center py-3 rounded-xl font-semibold hover:bg-emerald-50 transition"
            >
              Administrar quizzes
            </Link>

            <button className="border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Configuración general
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
