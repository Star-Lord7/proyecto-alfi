import { Link } from "react-router";
import logo from "../assets/logo.png.png";
import hero from "../assets/hero.mp4"


export function Welcome() {
  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="container mx-auto px-6 lg:px-10 py-8">
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="ALFI logo"
    className="h-12 w-auto ml-8"
  />
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
className="px-5 py-2.5 rounded-xl shadow-md text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
style={{ backgroundColor: "#02734A" }}            >
              User Demo
            </Link>
          </div>
        </div>
</header>


{/* HERO */}
<section className="container mx-auto px-6 lg:px-10 py-10 lg:py-14">

  
  {/* CARD */}
  <div className="bg-[#02734A] rounded-3xl p-8 lg:p-14 shadow-xl">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* TEXTO IZQUIERDO */}
      <div className="space-y-6 text-white">
        <span className="inline-flex items-center bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Aprendizaje Inteligente
        </span>

        <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-white/90">
          Domina tus <span className="text-white/90">Finanzas</span>
        </h2>

        <p className="text-lg text-white/90 max-w-xl leading-relaxed">
          Aprende, evalúa y domina tus conocimientos financieros
          con cuestionarios estructurados y casos reales diseñados
          para tu crecimiento profesional.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/login"
            className="inline-flex items-center bg-white text-[#02734A] px-8 py-4 rounded-xl shadow-lg font-semibold hover:scale-105 transition"
          >
            Empezar
          </Link>

          <button className="px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition">
            Saber más
          </button>
        </div>
      </div>

{/* VIDEO / ANIMACIÓN */}
<div className="flex items-center justify-center">
  <div className="rounded-2xl overflow-hidden bg-white/5">
    <video
      src={hero}
      autoPlay
      loop
      muted
      playsInline
      className="w-[700px] max-w-full object-contain"
    />
  </div>
</div>
</div>
  </div>
</section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-[#02734A] mb-4">
            ¿Por qué elegirnos?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las características que hacen de ALFI la mejor plataforma
            para tu educación financiera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Escenarios Reales",
            "Crecimiento Trazable",
            "Certificación Oficial",
          ].map((title) => (
            <div
              key={title}
              className="group bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#02734A] rounded-xl flex items-center justify-center mb-6">
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
</div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                {title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Contenido diseñado para ayudarte a crecer financieramente de
                forma clara y práctica.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CARD DOS*/}
      <section className="container mx-auto px-6 lg:px-10 py-8 lg:py-10">
        <div className="bg-[#02734A] rounded-3xl shadow-2xl p-12 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar tu viaje financiero?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están mejorando sus conocimientos financieros
          </p>
          <button className="bg-white text-[#02734A] px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition">
            Comenzar gratis
          </button>
        </div>
      </section>

    </div>
  );
}
