import { Link } from "react-router";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#02734A] px-6 lg:px-12 py-12">

      {/* HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16">
        <div>
          <span className="inline-block bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Panel interno
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Panel de Administración
          </h1>

          <p className="text-white/80 mt-2">
            Control y gestión de la plataforma ALFI
          </p>
        </div>

        <Link
          to="/"
          className="bg-white text-[#02734A] px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          Volver al inicio
        </Link>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Usuarios activos", value: "128" },
          { label: "Quizzes creados", value: "24" },
          { label: "Intentos totales", value: "1,542" },
          { label: "Tasa de aprobación", value: "76%" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <p className="text-gray-500 text-sm mb-2">{item.label}</p>
            <h3 className="text-3xl font-bold text-[#02734A]">
              {item.value}
            </h3>
          </div>
        ))}
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ESTADO PLATAFORMA */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#02734A] mb-6">
            Estado de la plataforma
          </h2>

          {[
            { name: "Finanzas personales", value: 92 },
            { name: "Inversiones", value: 68 },
            { name: "Crédito y deuda", value: 74 },
          ].map((item, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{item.name}</span>
                <span>{item.value}% completado</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#02734A] h-3 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ACCIONES ADMIN */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#02734A] mb-6">
            Acciones administrativas
          </h2>

          <div className="flex flex-col gap-4">
            <Link
              to="/admin/temas"
              className="bg-[#02734A] text-white text-center py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Gestionar Temas
            </Link>

            <Link
              to="/admin/quizzes"
              className="border-2 border-[#02734A] text-[#02734A] text-center py-3 rounded-xl font-semibold hover:bg-[#02734A]/10 transition"
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
