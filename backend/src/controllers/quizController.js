import * as quizModel from "../models/quizModel.js";
import { getCardsByCollectionIdForUser } from "../models/cardModel.js";

const userQuiz = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { puntajeUsuarioId } = req.body;
    const quizProfile = await quizModel.getUserQuizProfile(
      usuarioId,
      puntajeUsuarioId,
    );
    res.status(200).json(quizProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const startQuiz = async (req, res) => {
  try {
    const { usuarioId, coleccionId, perfilId } = req.body;

    // const userExists = await quizModel.checkUserExists(usuarioId);
    // if (!userExists) {
    //   return res.status(404).json({ error: "Usuario no encontrado" });
    // }

    // Buscar las tarjetas de la colección
    const coleccion = await getCardsByCollectionIdForUser(coleccionId);

    // Crear los datos del puntaje del usuario
    const quizStart = await quizModel.startQuizSession(perfilId, coleccionId);

    const { id } = quizStart;

    res.status(200).json({
      message: "Partida de quiz iniciada",
      puntajeUsuarioId: id,
      coleccion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { tarjetaId, opcionId, puntajeUsuarioId, tiempoRespuesta } = req.body;
    const result = await quizModel.evaluarRespuesta(
      tarjetaId,
      opcionId,
      puntajeUsuarioId,
      tiempoRespuesta,
    );

    if (result.message === "Respuesta incorrecta") {
      return res
        .status(200)
        .json({ message: "Respuesta incorrecta", feedback: result.feedback });
    }
    res.status(200).json({
      message: "Respuesta correcta",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { userQuiz, startQuiz, submitQuiz };
