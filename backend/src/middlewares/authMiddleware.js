import jwt from "jsonwebtoken";
import { isTokenActive } from "../models/tokenModel.js";

const verifyToken = async (req, res, next) => {
  try {
    //Obtenemos el encabezado de autorizacion
    const authHeader = req.headers["authorization"];
    //Validamos que el encabezado de autorizacion exista
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Necesitas autorización" });
    }

    // Obtenemos el token del encabezado
    const token = authHeader.split(" ")[1];
    //Validamos que el token exista
    if (!token) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Token no proporcionado" });
    }

    try {
      // Verificamos que el token sea valido
      const isActive = await isTokenActive(token);
      if (!isActive) {
        return res
          .status(401)
          .json({ message: "Acceso denegado. Token inválido o expirado" });
      }
      // Verificamos y decodificamos el token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // Adjuntamos la informacion del usuario a la solicitud
      req.user = decode;
      next(); // Continuamos al siguiente middleware o ruta
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Token inválido" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error en el servidor",
      error: error,
    });
  }
};

export { verifyToken };
