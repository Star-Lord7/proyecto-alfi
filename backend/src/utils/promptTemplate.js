import { getCollectionById } from "../models/collectionModel.js";

// Función auxiliar para obtener el nombre de la colección por su ID
const collectionById = async (coleccionId) => {
  try {
    const idParse = parseInt(coleccionId, 10);
    const collection = await getCollectionById(idParse);
    // Retornamos el nombre de la colección o "Desconocida" si no se encuentra
    return collection ? collection.nombre : "Desconocida";
  } catch (error) {
    throw new Error("Error obteniendo colección: " + error.message);
  }
};

// Plantilla de prompt para generar tarjetas
// Extraemos el nombre de la colección usando su ID
// y tambien usamos los otros parámetros para personalizar el prompt
export const cardPromptTemplate = async ({
  segmento,
  coleccionId,
  dificultad,
}) => `
Eres un experto en educación financiera y diseño de juegos educativos.

OBJETIVO
Crear UNA tarjeta educativa gamificada de finanzas.

CONTEXTO
- Segmento: ${segmento}
- Colección: ${await collectionById(coleccionId)}
- Dificultad: ${dificultad}

INSTRUCCIONES DE FORMATO (OBLIGATORIAS)
- Devuelve EXCLUSIVAMENTE JSON válido
- NO incluyas texto adicional
- NO uses comillas dobles dentro de los textos
- NO uses saltos de línea dentro de los valores

ESTRUCTURA OBLIGATORIA
{
  "titulo": "Titulo corto",
  "pregunta": "Texto de la pregunta en base a la categoría, segmento, nivel y colección",
  "opciones": [
    {
      "texto": "Opcion 1",
      "esCorrecta": true,
      "explicacion": "Explicacion"
    },
    {
      "texto": "Opcion 2",
      "esCorrecta": false,
      "explicacion": "Explicacion"
    },
    {
      "texto": "Opcion 3",
      "esCorrecta": false,
      "explicacion": "Explicacion"
    }
  ]
}

REGLAS DE CALIDAD
- Solo una opcion correcta
- Tres opciones exactas
- Lenguaje adecuado al segmento
- Contexto realista
- Enfoque educativo, no comercial
`;
