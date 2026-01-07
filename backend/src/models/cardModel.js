import prisma from "../config/prismaConfig.js";
import index from "../services/apiService.js";
import { cardPromptTemplate } from "../utils/promptTemplate.js";

const createPromptTemplate = async (params) => {
  try {
    const { coleccionId, dificultad = "BASICO" } = params;

    // 1️⃣ Generar prompt
    const prompt = cardPromptTemplate(params);

    // 2️⃣ Llamar a tu API de IA (index)
    const response = await index(prompt);

    // 3️⃣ Limpiar el texto y parsear JSON
    const raw = response.trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(raw);

    // 4️⃣ Crear tarjeta con opciones
    const tarjeta = await prisma.tarjeta.create({
      data: {
        pregunta: parsed.pregunta,
        dificultad: dificultad,
        estado: "GENERADA",
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

export { createPromptTemplate };
