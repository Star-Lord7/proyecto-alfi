import { Link } from "react-router";

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* HEADER */}
      <header className="container mx-auto px-6 lg:px-10 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              ALFI
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin"
              className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-emerald-100 text-emerald-700 font-semibold hover:shadow-md hover:border-emerald-200 transition-all duration-200"
            >
              Admin Demo
            </Link>
            <Link
              to="/user"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 rounded-xl shadow-md text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              User Demo
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Aprendizaje Inteligente
            </span>

            <h2 className="text-5xl lg:text-6xl font-bold text-emerald-800 leading-tight">
              Domina tus <span className="text-emerald-600">Finanzas</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Aprende, evalúa y domina tus conocimientos financieros con
              cuestionarios estructurados y casos reales diseñados para tu
              crecimiento profesional.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/login"
                className="group inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 rounded-xl shadow-lg font-semibold text-white hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Empezar
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <button className="px-8 py-4 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all duration-200">
                Saber más
              </button>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="flex items-center justify-center h-80">
            <div className="">
              <iframe
                src="https://lottie.host/embed/ee8102a8-f447-4faa-898d-d1ad5007ae71/fclRp0r7L4.lottie"
                className="w-[350px] h-[350px] border-0"
                title="Financial Learning Animation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las características que hacen de ALFI la mejor plataforma
            para tu educación financiera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">
              Escenarios Reales
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Enfrenta casos prácticos diseñados por expertos del sector
              financiero para prepararte mejor.
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">
              Crecimiento Trazable
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Visualiza tu progreso mediante métricas claras y paneles
              intuitivos que muestran tu evolución.
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">
              Certificación Oficial
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Valida tus conocimientos y mejora tu perfil profesional con
              certificados reconocidos.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="container mx-auto px-6 lg:px-10 py-16 mb-12">
        <div className="bg-emerald-600 rounded-3xl shadow-2xl p-12 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar tu viaje financiero?
          </h3>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están mejorando sus
            conocimientos financieros
          </p>
          <button className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            Comenzar gratis
          </button>
        </div>
      </section>
    </div>
  );
}
