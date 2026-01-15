import { useState } from "react";
import "./finanzas.css";

/* ================= MOCK ================= */
const preguntas = [
  {
    categoria: "Finanzas personales",
    pregunta: "¿Qué es un fondo de emergencia?",
    opciones: [
      {
        id: 1,
        texto: "Dinero para invertir en acciones",
        correcta: false,
        explicacion:
          "Las inversiones implican riesgo y no deben usarse para emergencias."
      },
      {
        id: 2,
        texto: "Ahorro para gastos inesperados",
        correcta: true,
        explicacion:
          "Un fondo de emergencia sirve para cubrir imprevistos como salud o desempleo."
      },
      {
        id: 3,
        texto: "Dinero para compras grandes",
        correcta: false,
        explicacion:
          "Las compras planificadas no son emergencias financieras."
      }
    ]
  }
];
/* ======================================== */

export default function Finanzas() {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  const preguntaActual = preguntas[indice];
  const total = preguntas.length;
  const progreso = Math.round(((indice + 1) / total) * 100);

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
                Pregunta {indice + 1} de {total} · {progreso}%
              </span>
            </div>

            <div className="categoria">
              {preguntaActual.categoria}
            </div>

            <h2>{preguntaActual.pregunta}</h2>

            {preguntaActual.opciones.map(op => (
              <button
                key={op.id}
                type="button"
                className={`opcion ${seleccion === op.id ? "selected" : ""}`}
                onClick={() => setSeleccion(op.id)}
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

              <button className="secondary" type="button">
                SALTAR
              </button>
            </div>
          </div>

          {/* ===== BACK ===== */}
          <div className="card-face card-back">
            <h3>Resultado</h3>

            {preguntaActual.opciones.map(op => (
              <div
                key={op.id}
                className={`resultado ${
                  op.correcta ? "correcta" : "incorrecta"
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
