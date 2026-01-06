import prisma from "../config/prisma.js";
import index from "../services/apiService.js";
import { cardPromptTemplate } from "../utils/promptTemplate.js";

const createPromptTemplate = async (params) => {
  try {
    const prompt = cardPromptTemplate(params);

    const response = await index(prompt);

    const raw = response.trim().replace(/```json|```/g, "");

    const parsed = JSON.parse(raw);

    const tarjeta = await prisma.tarjeta.create({
      data: {
        titulo: parsed.titulo,
        pregunta: parsed.pregunta,
        opciones: parsed.opciones,
        estado: "GENERADA",
      },
    });

    return tarjeta;
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

export { createPromptTemplate };
