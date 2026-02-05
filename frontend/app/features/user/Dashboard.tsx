import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import ModalSeleccionQuiz from "../../components/ModalSeleccionQuiz";

export default function Dashboard() {

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleStartQuiz = (puntajeUsuarioId: number, preguntas: any[]) => {
    // Navegar a la página del quiz pasando los datos
    navigate("/user/quiz", {
      state: { puntajeUsuarioId, preguntas },
    });
  };

  return (
    <div className="min-h-screen bg-white px-10 py-12">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-14">
        <h1 className="text-5xl font-bold text-[#02734A]">
          Dashboard
        </h1>

        <Link
          to="/"
          className="bg-[#02734A] px-5 py-2 rounded-lg shadow text-white font-semibold hover:opacity-90 transition"
        >
          Volver al inicio
        </Link>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: "Quizzes completados", value: "12" },
          { label: "Puntaje promedio", value: "87%" },
          { label: "Nivel actual", value: "Intermedio" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#02734A] rounded-xl shadow-md p-6 text-white"
          >
            <p className="text-white/80 text-sm mb-2">{item.label}</p>
            <h3 className="text-4xl font-bold">{item.value}</h3>
          </div>
        ))}
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* PROGRESS */}
        <div className="md:col-span-2 bg-[#02734A] rounded-2xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">
            Progreso de aprendizaje
          </h2>

          <div className="space-y-4">
            {[
              { label: "Finanzas personales", value: 80 },
              { label: "Inversiones", value: 55 },
              { label: "Crédito y deuda", value: 65 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-white/80 mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="bg-[#02734A] rounded-2xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">
            Acciones rápidas
          </h2>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-[#02734A] text-center py-3 rounded-xl font-semibold hover:bg-white/90 transition"
            >
              Empezar nuevo quiz
            </button>

            <button className="border border-white text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Ver resultados
            </button>

            <button className="border border-white/50 text-white/80 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Configuración
            </button>
          </div>
        </div>
      </section>

      {/* MODAL SELECCIÓN QUIZ */}
      <ModalSeleccionQuiz
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStart={handleStartQuiz}
      />
    </div>
  );
}

