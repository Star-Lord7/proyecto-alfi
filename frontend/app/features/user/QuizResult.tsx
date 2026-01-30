import { useLocation, useNavigate, Link } from "react-router";
import { useEffect } from "react";

export default function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();

  const { puntajeFinal, totalPreguntas } = location.state as {
    puntajeFinal: number;
    totalPreguntas: number;
  };

  // Validar que existan datos
  useEffect(() => {
    if (puntajeFinal === undefined || !totalPreguntas) {
      alert("No hay datos de resultados. Vuelve al dashboard.");
      navigate("/user");
    }
  }, [puntajeFinal, totalPreguntas, navigate]);

  // Calcular el puntaje máximo posible (10 puntos por pregunta)
  const puntajeMaximo = totalPreguntas * 10;
  
  // Calcular porcentaje
  const porcentaje = Math.round((puntajeFinal / puntajeMaximo) * 100);

  // Determinar mensaje según el puntaje
  const getMensaje = () => {
    if (puntajeFinal === puntajeMaximo) {
      // 100% - Perfecto
      return {
        titulo: "¡Perfecto! 🎉",
        descripcion: "¡Increíble! Respondiste todas las preguntas correctamente. ¡Eres un experto en el tema!",
        emoji: "🏆",
        color: "text-yellow-500"
      };
    } else if (porcentaje >= 67) {
      // 67% o más (2 de 3 correctas o más)
      return {
        titulo: "¡Muy bien!",
        descripcion: "¡Buen trabajo! Tienes un sólido conocimiento del tema. Sigue así y serás un experto.",
        emoji: "🎯",
        color: "text-green-500"
      };
    } else if (porcentaje >= 34) {
      // 34-66% (1 de 3 correctas)
      return {
        titulo: "¡Puedes hacerlo mejor!",
        descripcion: "Vas por buen camino, pero hay espacio para mejorar. Sigue aprendiendo y practicando más.",
        emoji: "💪",
        color: "text-blue-500"
      };
    } else {
      // 0-33% (0 correctas o muy pocas)
      return {
        titulo: "¡No te rindas!",
        descripcion: "Este tema necesita más práctica. Te recomendamos revisar el material y volver a intentarlo. ¡Tú puedes!",
        emoji: "📚",
        color: "text-orange-500"
      };
    }
  };

  const mensaje = getMensaje();

  // Calcular respuestas correctas e incorrectas
  const respuestasCorrectas = Math.round(puntajeFinal / 10);
  const respuestasIncorrectas = totalPreguntas - respuestasCorrectas;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02734A] to-[#025a3a] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        {/* Emoji */}
        <div className="text-center mb-6">
          <span className="text-8xl">{mensaje.emoji}</span>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          {mensaje.titulo}
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 text-center mb-8 text-lg">
          {mensaje.descripcion}
        </p>

        {/* Puntaje circular */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            {/* Círculo de fondo */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Círculo de progreso */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#02734A"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(porcentaje / 100) * 553} 553`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-[#02734A]">
                {porcentaje}%
              </span>
              <span className="text-gray-500 text-sm mt-1">Precisión</span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-xs mb-1">Puntaje</p>
            <p className="text-2xl font-bold text-[#02734A]">
              {puntajeFinal}/{puntajeMaximo}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-xs mb-1">Correctas</p>
            <p className="text-2xl font-bold text-green-600">
              {respuestasCorrectas}
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-xs mb-1">Incorrectas</p>
            <p className="text-2xl font-bold text-red-600">
              {respuestasIncorrectas}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/user"
            className="flex-1 bg-[#02734A] text-white text-center py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
          >
            Volver al Dashboard
          </Link>
          <button
            onClick={() => navigate("/user/quiz", { replace: true })}
            className="flex-1 border-2 border-[#02734A] text-[#02734A] py-4 rounded-xl font-semibold hover:bg-[#02734A] hover:text-white transition"
          >
            Repetir Quiz
          </button>
        </div>
      </div>
    </div>
  );
}