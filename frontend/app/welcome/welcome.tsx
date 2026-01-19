import { Link } from "react-router";

export function Welcome() {
  return (
    <div className="min-h-screen bg-gray-300 px-10 py-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-7xl font-bold text-emerald-800">
          ALFI
        </h1>

        <div className="flex gap-4">
          <Link to="/admin" className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition">
            Admin Demo
          </Link>
          <Link to="/user" className="bg-white px-5 py-2 rounded-lg shadow text-emerald-800 font-semibold hover:shadow-md transition">
            User Demo
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <span className="inline-block bg-white text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow">
            Aprendizaje Inteligente
          </span>

          <h2 className="text-5xl font-bold text-emerald-800 mb-6 leading-tight">
            Domina tus <br />
            <span className="text-emerald-700">Finanzas</span>
          </h2>

          <p className="text-gray-600 mb-8 max-w-xl">
            Aprende, evalúa y domina tus conocimientos financieros con
            cuestionarios estructurados y casos reales diseñados para tu crecimiento.
          </p>

          <div className="flex gap-4">
            <button className="bg-white px-6 py-3 rounded-xl shadow font-semibold text-emerald-800 hover:shadow-lg transition">
              Empezar ahora
            </button>

            <button className="px-6 py-3 rounded-xl border border-emerald-700 text-emerald-700 font-semibold hover:bg-white transition">
              Saber más
            </button>
          </div>
        </div>

        {/* HERO IMAGE PLACEHOLDER */}
        <div className="bg-white rounded-2xl shadow-lg h-80 flex items-center justify-center text-gray-600">
          Imagen / Ilustración
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h3 className="text-3xl font-bold text-emerald-800 mb-10">
          ¿Por qué elegirnos?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-emerald-700 mb-2">
              Escenarios Reales
            </h4>
            <p className="text-gray-600">
              Enfrenta casos prácticos diseñados por expertos del sector financiero.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-emerald-700 mb-2">
              Crecimiento Trazable
            </h4>
            <p className="text-gray-600">
              Visualiza tu progreso mediante métricas claras y paneles intuitivos.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-emerald-700 mb-2">
              Certificación Oficial
            </h4>
            <p className="text-gray-600">
              Valida tus conocimientos y mejora tu perfil profesional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
