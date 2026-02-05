import { Link } from "react-router-dom"
import { useState } from "react"

import logoAlfi from "../../assets/logo.png.png"
import coin from "../../assets/coin.png"
import bullHappy from "../../assets/bullHappyT.png"
import check from "../../assets/check.png"
import finanzasIcon from "../../assets/finanzasIcon.png"
import inversionesIcon from "../../assets/inversionesIcon.png"
import creditoIcon from "../../assets/creditoIcon.png"
import playIcon from "../../assets/ver.png"
import resultsIcon from "../../assets/lista.png"
import settingsIcon from "../../assets/ajustes.png"


export default function Dashboard() {
  const [openProfile, setOpenProfile] = useState(false)

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-8 py-6 font-sans">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        {/* LOGO */}
        <div className="w-40 h-10 flex items-center">
          <img src={logoAlfi} alt="ALFI" className="h-8 w-auto" />
        </div>

        {/* PERFIL */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="w-10 h-10 rounded-full bg-[#1f6f4a] text-white font-bold flex items-center justify-center shadow"
          >
            J
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg overflow-hidden z-20">
              <Link
                to="/user/profile"
                className="block px-4 py-3 text-[#02734A] hover:bg-gray-50"
              >
                👤 Mi perfil
              </Link>

              <Link
                to="/user/configuracion"
                className="block px-4 py-3 text-[#02734A] hover:bg-gray-50"
              >
                ⚙️ Configuración
              </Link>

              <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* TITULO */}
      <h2 className="text-2xl font-bold text-[#0f5132] mt-6 flex items-center gap-2">
        Tu camino financiero
      </h2>

      <p className="text-[#6c8f7c] mt-1">
        Vas excelente, seguí avanzando a tu próximo nivel
      </p>

      {/* STATS */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 mt-4">

        {/* NIVEL */}
        <div className="rounded-2xl p-4 text-white shadow-lg shadow-black/5 bg-gradient-to-r from-[#1f6f4a] to-[#2f8f65]">
          <p className="text-sm opacity-80">Nivel actual</p>
          <h3 className="text-2xl font-bold mt-1 flex items-center gap-2">
  Intermedio
  <img src={coin} alt="Moneda" className="h-10 w-9" />
</h3>


          <div className="mt-4">
            <div className="h-2 bg-white/30 rounded-full">
              <div className="h-2 w-[90%] bg-yellow-300 rounded-full" />
            </div>
            <p className="text-sm mt-1 opacity-80">90% completado</p>
          </div>
        </div>

        {/* QUIZZES */}
        <div className="bg-[#F14E45] rounded-2xl p-4 shadow-lg shadow-black/5">
          <p className="text-sm opacity-80">Quizzes completados</p>
          <h3 className="text-2xl font-bold mt-1 flex items-center gap-2">
            12 <span className="text-white">/ 20</span>
            <img src={check} alt="" className="h-10 w-9" />
          </h3>

          <div className="mt-4">
            <div className="h-2 bg-white/30 rounded-full">
              <div className="h-2 w-[90%] bg-[#FFB97B] rounded-full" />
            </div>
            <p className="text-sm mt-1 opacity-80">Progreso imparable</p>
          </div>
        </div>

        {/* PUNTAJE PROMEDIO */}
<div className="bg-[#3a4661] rounded-2xl p-4 shadow-lg shadow-black/5 text-white">
  <p className="text-sm opacity-80 mb-2">
    Puntaje promedio
  </p>

  <div className="flex items-center gap-12">
    {/* NUMERO */}
    <div>
      <p className="text-4xl font-bold leading-none">
        87%
      </p>
      <p className="text-sm opacity-80 mt-1">
        Muy buen desempeño
      </p>
    </div>

    {/* BULL */}
    <img
      src={bullHappy}
      alt="Puntaje"
      className="w-28 h-28"
    />
  </div>
</div>
      </section>

      {/* CONTENT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* PROGRESO */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-[#1f6f4a] mb-4">
            Progreso de aprendizaje
          </h3>
            {[
  { label: "Finanzas personales", value: 80, icon: finanzasIcon },
  { label: "Inversiones", value: 55, icon: inversionesIcon },
  { label: "Crédito y deuda", value: 65, icon: creditoIcon },
].map((item, i) => (
  <div
    key={i}
    className="bg-white rounded-2xl p-4 mb-4 shadow-lg shadow-black/5"
  >
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-3">
        <img
          src={item.icon}
          alt={item.label}
          className="w-6 h-6 object-contain"
        />
        <span className="font-semibold text-[#1f6f4a]">
          {item.label}
        </span>
      </div>

      <span className="font-bold text-[#1f6f4a]">
        {item.value}%
      </span>
    </div>

    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-2 bg-[#02734A]"
        style={{ width: `${item.value}%` }}
      />
    </div>
  </div>
))}
        </div>

        {/* ACCIONES */}
        <div>
 <h3 className="text-xl font-bold text-[#1f6f4a] mb-4">
  Acciones rápidas
</h3>

<div className="space-y-3">

  {/* SEGUIR APRENDIENDO */}
  <Link
    to="/quiz"
    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow"
  >
    <img src={playIcon} alt="Seguir aprendiendo" className="w-8 h-8" />
    Seguir aprendiendo
  </Link>

  {/* VER RESULTADOS */}
  <button
    className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 font-semibold text-[#1f6f4a] hover:bg-gray-50"
  >
    <img src={resultsIcon} alt="Ver resultados" className="w-10 h-10" />
    Ver resultados
  </button>

  {/* CONFIGURACION */}
  <button
    className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 font-semibold text-gray-500 hover:bg-gray-50"
  >
    <img src={settingsIcon} alt="Configuración" className="w-10 h-10" />
    Configuración
  </button>

</div>

</div>
      </section>
    </div>
  )
}
