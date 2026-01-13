import { useEffect, useState } from "react";
import "./finanzas.css";

type Opcion = {
  texto: string;
  esCorrecta: boolean;
  explicacion: string;
};

type Pregunta = {
  titulo: string;
  pregunta: string;
  opciones: Opcion[];
};

export default function Preguntas() {
  const [preguntaData, setPreguntaData] = useState<Pregunta | null>(null);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/alfi/finanzas")
      .then(res => res.json())
      .then(data => setPreguntaData(data))
      .catch(err => console.error(err));
  }, []);

  if (!preguntaData) {
    return <p>Cargando pregunta...</p>;
  }

  const progreso = 100;

  return (
    <div className="finanzas-container">
      <div className="card-wrapper">
        <div className={`card ${mostrarRespuesta ? "flipped" : ""}`}>

          {/* ===== FRONT ===== */}
          <div className="card-face card-front">
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progreso}%` }}
              />
              <span className="progress-text">
                Pregunta · {progreso}%
              </span>
            </div>

            <div className="categoria">
              {preguntaData.titulo}
            </div>

            <h2>{preguntaData.pregunta}</h2>

            {preguntaData.opciones.map((op, index) => (
              <button
                key={index}
                type="button"
                className={`opcion ${seleccion === index ? "selected" : ""}`}
                onClick={() => setSeleccion(index)}
              >
                {op.texto}
              </button>
            ))}

            <div className="acciones">
              <button
                className="primary"
                disabled={seleccion === null}
                onClick={() => setMostrarRespuesta(true)}
              >
                RESPONDER
              </button>

              <button
                className="secondary"
                type="button"
                onClick={() => {
                  setSeleccion(null);
                  setMostrarRespuesta(true);
                }}
              >
                SALTAR
              </button>
            </div>
          </div>

          {/* ===== BACK ===== */}
          <div className="card-face card-back">
            <h3>Resultado</h3>

            {preguntaData.opciones.map((op, index) => (
              <div
                key={index}
                className={`resultado ${
                  op.esCorrecta ? "correcta" : "incorrecta"
                }`}
              >
                <strong>{op.texto}</strong>
                <p>{op.explicacion}</p>
              </div>
            ))}

            <div className="acciones">
              <button
                className="primary"
                onClick={() => {
                  setSeleccion(null);
                  setMostrarRespuesta(false);
                }}
              >
                CONTINUAR
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
