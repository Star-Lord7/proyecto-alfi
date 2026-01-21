import { getCollectionById } from "../models/collectionModel.js";

// Función auxiliar para obtener el nombre de la colección por su ID
const collectionById = async (coleccionId) => {
  try {
    const idParse = parseInt(coleccionId, 10);
    const collection = await getCollectionById(idParse);
    // Retornamos el nombre de la colección o "Desconocida" si no se encuentra
    return collection ? collection.titulo : "Desconocida";
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
- El orden de las opciones DEBE SER ALEATORIO
- La respuesta correcta NO debe estar siempre en la misma posición

ESTRUCTURA OBLIGATORIA
{
  "titulo": "Titulo corto",
  "pregunta": "Texto de la pregunta en base a la categoría, segmento, nivel y colección",
  "opciones": [
    {
      "texto": "Opcion 1 realista",
      "esCorrecta": true | false,
      "explicacion": "Explicacion educativa clara"
    },
    {
      "texto": "Opcion 2 realista",
      "esCorrecta": true | false,
      "explicacion": "Explicacion educativa clara"
    },
    {
      "texto": "Opcion 3 realista",
      "esCorrecta": true | false,
      "explicacion": "Explicacion educativa clara"
    }
  ]
}

REGLAS DE OPCIONES (MUY IMPORTANTE)
- Deben existir EXACTAMENTE 3 opciones
- SOLO UNA opción puede ser correcta
- Las opciones incorrectas deben ser plausibles y comunes en la vida real
- Evita opciones absurdas, graciosas o claramente incorrectas
- Las opciones deben diferenciarse por conceptos, no por palabras obvias

REGLAS DE CALIDAD
- Lenguaje adecuado al segmento (${segmento})
- Dificultad coherente con el nivel (${dificultad})
- Contexto realista y cotidiano
- Enfoque educativo, no comercial
- No repetir estructuras ni patrones evidentes
`;
