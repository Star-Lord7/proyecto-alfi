import { useState } from "react";
import "./footer.css";
import personajeImg from "../assets/personaje.png";

export default function Footer() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !mensaje) {
      alert("Completa todos los campos");
      return;
    }

    // Mostrar modal
    setShowModal(true);

    // Limpiar campos
    setNombre("");
    setCorreo("");
    setMensaje("");
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          {/* Conócenos */}
          <div className="footer-col">
            <h4>Conócenos</h4>

            <a
              href="https://www.instagram.com/alfi.finanzas/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Instagram
            </a>

            <a
              href="https://mx.linkedin.com/company/soyalfi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Linkedin
            </a>

            <a
              href="mailto:contacto@soyalfi.com"
              className="footer-link"
            >
              Correo Electrónico
            </a>

            <h4 className="mt">Productos</h4>
            <a href="/premium" className="footer-link">Alfi Premium</a>
            <a href="/empresarial" className="footer-link">Alfi Empresarial</a>
          </div>

          {/* Más retos */}
          <div className="footer-col">
            <h4>Más retos</h4>
            <a href="/ahorro" className="footer-link">Ahorro</a>
            <a href="/credito" className="footer-link">Crédito</a>
            <a href="/finanzas" className="footer-link">Finanzas Personales</a>
            <a href="/inversion" className="footer-link">Inversión</a>
          </div>

          {/* FORM + IMAGEN */}
          <div className="footer-col footer-form-image">
            <div className="footer-form">
              <h4>Comunícate con Nosotros</h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Ingrese su nombre aquí..."
                  className="footer-input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Ingrese su correo aquí..."
                  className="footer-input"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />

                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  className="footer-textarea"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />

                <button type="submit" className="footer-btn">
                  Enviar
                </button>
              </form>
            </div>

            <div className="footer-image">
              <img src={personajeImg} alt="Personaje Alfi" />
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          Copyright © 2025 Alfi - All Rights Reserved.
        </div>
      </footer>

      {/*MODAL*/}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-[#02734A] mb-4">
              ¡Mensaje enviado!📩
            </h2>

            <p className="text-gray-600 mb-6">
              Gracias por contactarnos. Te responderemos lo antes posible.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-[#02734A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#025c3d] transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
