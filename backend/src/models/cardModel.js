import prisma from "../config/prismaConfig.js";
import index from "../services/apiService.js";
import { promptTexto } from "../services/geminiAI.js";
import { cardPromptTemplate } from "../utils/promptTemplate.js";

// Método para obtener tarjetas por ID de colección
const getCardsByCollectionId = async (coleccionId, limit = 3) => {
  try {
    const coleccionIdParse = parseInt(coleccionId, 10);
    const cards = await prisma.tarjeta.findMany({
      where: {
        coleccionId: coleccionIdParse,
        estado: "APROBADA",
      },
      take: limit, // Limitar el número de tarjetas devueltas
      include: {
        opciones: true,
      },
    });
    // Mezclar las tarjetas antes de devolverlas
    return cards.sort(() => Math.random() - 0.5);
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

const getCardsForReview = async (estado) => {
  try {
    const cards = await prisma.tarjeta.findMany({
      where: {
        estado: estado,
      },
      include: {
        opciones: true,
      },
    });
    return cards;
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

// Método para crear una nueva tarjeta
const createCard = async (params) => {
  try {
    // Extraemos los parámetros
    const { segmento, coleccionId, dificultad = "BASICO" } = params;

    // Generar el prompt usando la plantilla y le pasamos los parámetros
    const prompt = await cardPromptTemplate({
      segmento,
      coleccionId,
      dificultad,
    });

    // API OPENROUTER - TODOS
    // const response = await index(prompt);
    // API GEMINI - SAMUEL
    const response = await promptTexto(prompt);

    // Limpiamos el texto y parseamos a JSON
    const raw = response.trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(raw);

    // Creamos la tarjeta
    const tarjeta = await prisma.tarjeta.create({
      data: {
        pregunta: parsed.pregunta,
        dificultad: dificultad,
        estado: "PENDIENTE_REVISION",
        coleccionId: coleccionId,
        opciones: {
          create: parsed.opciones.map((o) => ({
            descripcion: o.texto,
            es_correcta: o.esCorrecta,
            feedback: o.explicacion,
            puntos: o.esCorrecta ? 10 : 0,
          })),
        },
      },
      include: {
        opciones: true, // incluir opciones en la respuesta
      },
    });

    return tarjeta;
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

// Método para actualizar una tarjeta
const updateCard = async (id, updateData) => {
  try {
    const idParse = parseInt(id, 10);
    const updatedCard = await prisma.tarjeta.update({
      where: {
        id: idParse,
      },
      data: updateData,
    });
    return updatedCard;
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

// Método para eliminar una tarjeta (marcar como RECHAZADA)
const deleteCard = async (id) => {
  try {
    const idParse = parseInt(id, 10);
    await prisma.tarjeta.update({
      where: {
        id: idParse,
      },
      data: {
        estado: "RECHAZADA",
        deleted_at: new Date(),
      },
    });
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

export {
  getCardsByCollectionId,
  getCardsForReview,
  createCard,
  updateCard,
  deleteCard,
};
