import jwt from "jsonwebtoken";
import { verifyPassword } from "../services/userService.js";
import { deleteToken, saveToken } from "../models/tokenModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await verifyPassword(email, password);
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES },
    );

    await saveToken(user.id, token);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token,
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      // },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error en el servidor",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Verificamos el encabezado de autorizacion
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Necesitas autorización" });
    }

    // verificamos el token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Token no proporcionado" });
    }

    const tokenDeleted = await deleteToken(token);
    if (!tokenDeleted) {
      return res
        .status(400)
        .json({ message: "No se pudo cerrar sesión. Token inválido" });
    }

    return res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error en el servidor",
      error: error.message,
    });
  }
};

export { login, logout };
