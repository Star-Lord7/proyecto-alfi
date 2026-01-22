import "./footer.css";
import personajeImg from "../assets/personaje.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Columna: Conócenos */}
        <div className="footer-col">
          <h4>Conócenos</h4>
          <ul>
            <li>Alfi Finanzas</li>
            <li>Alfi</li>
            <li>Contacto@soyalfi.com</li>
          </ul>

          <h4 className="mt">Productos</h4>
          <ul>
            <li>Alfi Premium</li>
            <li>Alfi Empresarial</li>
          </ul>
        </div>

        {/* Columna: Más retos */}
        <div className="footer-col">
          <h4>Más retos</h4>
          <ul>
            <li>Ahorro</li>
            <li>Crédito</li>
            <li>Finanzas Personales</li>
            <li>Inversión</li>
          </ul>
        </div>

        {/* Columna: Formulario */}
        <div className="footer-col">
          <h3>Comunícate con Nosotros</h3>
          <input type="text" placeholder="Ingrese su nombre aquí..." />
          <input type="email" placeholder="Ingrese su mail aquí..." />
          <button>Enviar</button>
        </div>

        {/* Imagen */}
        <div className="footer-image">
          <img src={personajeImg} alt="Personaje Alfi" />
        </div>

      </div>

      <div className="footer-bottom">
        Copyright © 2025 Alfi - All Rights Reserved.
      </div>
    </footer>
  );
}
