import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import "./finanzas.css";

interface Opcion {
  id: number;
  descripcion: string;
  feedback: string;
  es_correcta: boolean;
  puntos: number;
  tarjetaId: number;
}

interface Pregunta {
  id: number;
  pregunta: string;
  dificultad: string;
  opciones: Opcion[];
}

const PIXABAY_API_KEY = "54427395-8a82412784040e8b13c11cb88";

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, token } = useAuth();

  const { puntajeUsuarioId, preguntas } = location.state as {
    puntajeUsuarioId: number;
    preguntas: Pregunta[];
  };

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [esCorrecta, setEsCorrecta] = useState<boolean | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string>("");
  const [loadingImagen, setLoadingImagen] = useState(true);

  // Validar que existan datos
  useEffect(() => {
    if (!puntajeUsuarioId || !preguntas || preguntas.length === 0) {
      alert("No hay datos de partida. Vuelve al dashboard.");
      navigate("/user");
    }
  }, [puntajeUsuarioId, preguntas, navigate]);

  // Cargar imagen de Pixabay al montar el componente
  useEffect(() => {
    const cargarImagen = async () => {
      try {
      // Generamos un número de página aleatorio para que pueda traer imagen de distintas paginas 
      const randomPage = Math.floor(Math.random() * 5) + 1;

      // Aumentamos per_page a 50 para tener variedad real
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=finance+money&image_type=photo&per_page=50&page=${randomPage}&orientation=horizontal`
      );
      
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        // elegimos una al azar entre 50 opciones, para asegurar que sea una imagen diferente cada vez
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        setImagenUrl(data.hits[randomIndex].largeImageURL); // Usamos largeImageURL para mejor calidad
      }
    } catch (error) {
      console.error("Error al cargar imagen:", error);
    } finally {
      setLoadingImagen(false);
    }
  };

    cargarImagen();
  }, []);

  if (!preguntas || preguntas.length === 0) return null;

  const preguntaActual = preguntas[indice];
  const total = preguntas.length;
  const progreso = Math.round(((indice + 1) / total) * 100);

  const handleResponder = async () => {
    if (seleccion === null) return;

    try {
      //segundo endpoint que registra las respuesta del usuario
      const res = await axios.post(
        "http://localhost:3000/api-alfi/game/start/respuestas",
        {
          tarjetaId: preguntaActual.id,
          opcionId: seleccion,
          puntajeUsuarioId: puntajeUsuarioId,
          tiempoRespuesta: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extraer feedback de la respuesta
      const feedbackTexto =
        res.data.feedback || res.data.result?.feedback || "Respuesta registrada";
      const correcta =
        res.data.message === "Respuesta correcta" ||
        res.data.result?.result?.esCorrecta === true;

      setFeedback(feedbackTexto);
      setEsCorrecta(correcta);
      setMostrarRespuesta(true);
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      alert("Error al enviar respuesta. Intenta de nuevo.");
    }
  };

  const handleContinuar = () => {
    if (indice < total - 1) {
      // Siguiente pregunta
      setIndice(indice + 1);
      setSeleccion(null);
      setMostrarRespuesta(false);
      setFeedback("");
      setEsCorrecta(null);
    } else {
      // Terminar quiz
      finalizarQuiz();
    }
  };

  const finalizarQuiz = async () => {
    try {
      //tercer endpoint para finalizar el quiz el cual obtiene el puntaje final
      const res = await axios.post(
        `http://localhost:3000/api-alfi/game/usuario/${userId}`,
        {
          puntajeUsuarioId: String(puntajeUsuarioId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { puntajeFinal } = res.data;

      // Navegar a página de resultados
      navigate("/user/resultados", {
        state: { puntajeFinal, totalPreguntas: total },
      });
    } catch (error) {
      console.error("Error al finalizar quiz:", error);
      alert("Error al obtener puntaje final.");
    }
  };

return (
  <div className="finanzas-container">
    <div className="card-wrapper">
      <div className={`card ${mostrarRespuesta ? "flipped" : ""}`}>

        {/* ================= FRONT ================= */}
        <div className="card-face card-front">
          <div className="card-layout">

            {/* Imagen izquierda */}
            <div className="card-image-container">
              {loadingImagen ? (
                <div className="card-image skeleton" />
              ) : imagenUrl ? (
                <img
                  src={imagenUrl}
                  alt="Pregunta"
                  className="card-image"
                />
              ) : null}
            </div>

            {/* Contenido derecho */}
            <div className="card-content">

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${progreso}%` }}
                />
                <span className="progress-text">
                  Pregunta {indice + 1} de {total} · {progreso}%
                </span>
              </div>

              <div className="categoria">
                {preguntaActual.dificultad}
              </div>

              <h2 className="pregunta">
                {preguntaActual.pregunta}
              </h2>

              <div className="opciones">
                {preguntaActual.opciones.map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    className={`opcion ${
                      seleccion === op.id ? "selected" : ""
                    }`}
                    onClick={() => setSeleccion(op.id)}
                    disabled={mostrarRespuesta}
                  >
                    {op.descripcion}
                  </button>
                ))}
              </div>

              <div className="acciones">
                <button
                  className="primary"
                  disabled={seleccion === null}
                  onClick={handleResponder}
                >
                  RESPONDER
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div className="card-face card-back">

          <h3 className={esCorrecta ? "correcta" : "incorrecta"}>
            {esCorrecta ? "¡Correcto! ✓" : "Incorrecto ✗"}
          </h3>
                
          <div className="opciones-feedback">
            {preguntaActual.opciones.map((op) => {
              const esSeleccionada = op.id === seleccion;

              return (
                <div
                  key={op.id}
                  className={`opcion-feedback
                    ${op.es_correcta ? "correcta" : "incorrecta"}
                    ${esSeleccionada ? "seleccionada" : ""}
                  `}
                >
                  <p className="descripcion">
                    {op.descripcion}
                  </p>
                  <p className="feedback">
                    {op.feedback}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="acciones">
            <button
              className="primary"
              onClick={handleContinuar}
            >
              {indice < total - 1
                ? "CONTINUAR"
                : "VER RESULTADOS"}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}
