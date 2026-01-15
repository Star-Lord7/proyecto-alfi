import { Link } from "react-router";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-300 px-10 py-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-14">
        <h1 className="text-5xl font-bold text-emerald-800">
          Dashboard
        </h1>

        <Link
          to="/"
          className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition"
        >
          Volver al inicio
        </Link>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Quizzes completados</p>
          <h3 className="text-4xl font-bold text-emerald-800">12</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Puntaje promedio</p>
          <h3 className="text-4xl font-bold text-emerald-800">87%</h3>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Nivel actual</p>
          <h3 className="text-4xl font-bold text-emerald-800">Intermedio</h3>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* PROGRESS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">
            Progreso de aprendizaje
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Finanzas personales</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[80%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Inversiones</span>
                <span>55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[55%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Crédito y deuda</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-700 h-3 rounded-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">
            Acciones rápidas
          </h2>

          <div className="flex flex-col gap-4">
            <Link
              to="/user/finanzas"
              className="bg-emerald-700 text-white text-center py-3 rounded-xl font-semibold hover:bg-emerald-800 transition"
            >
              Continuar quiz
            </Link>

            <button className="border border-emerald-700 text-emerald-700 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition">
              Ver resultados
            </button>

            <button className="border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Configuración
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
