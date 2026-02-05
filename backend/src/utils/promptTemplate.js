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

//para que varien las preguntas
const tiposPregunta = [
  "Pregunta de Conceptos", // ¿Qué es exactamente X?
  "Identificación de Característica", // ¿Cuál de estos rasgos pertenece a X?
  "Diferenciación", // Diferencia entre este concepto y uno similar
  "Aplicación Práctica", // Caso real de uso del concepto
  "Análisis de Consecuencia", // Si pasa X, ¿qué sucede con este concepto?
  "Identificación de Mito", // Cuál de estas creencias sobre el tema es falsa
];

//funcion para que se ejecute cada vez que se llama al promt y se evite que se utilice el mismo
//tipo de pregunta en todas las tarjetas generadas
function obtenerTipoPregunta() {
  return tiposPregunta[Math.floor(Math.random() * tiposPregunta.length)];
}

const tipoSeleccionado = obtenerTipoPregunta(); 

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
- TIPO DE PREGUNTA: ${tipoSeleccionado}

INSTRUCCIONES DE FORMATO (OBLIGATORIAS)
- Devuelve EXCLUSIVAMENTE JSON válido
- NO incluyas texto adicional
- NO uses comillas dobles dentro de los textos
- NO uses saltos de línea dentro de los valores
- El orden de las opciones DEBE SER ALEATORIO
- La respuesta correcta NO debe estar siempre en la misma posición

REGLAS DE VARIABILIDAD
- En base al tipo de pregunta relacionado al titulo de Coleccion
- Calidad de Distractores: 
    * Una opción es la CORRECTA.
    * Una opción parece lógica pero es incorrecta.
    * Una opción es un "Error comun" (fallo por poco o confusión de términos similares).

ESTRUCTURA OBLIGATORIA
{
  "titulo": "Titulo corto",
  "pregunta": "Texto de la pregunta en base a la categoría, segmento, nivel y colección",
  "opciones": [
    {
      "texto": "Opcion 1",
      "esCorrecta": true | false,
      "explicacion": "Explicacion educativa clara"
    },
    {
      "texto": "Opcion 2",
      "esCorrecta": true | false,
      "explicacion": "Explicacion educativa clara"
    },
    {
      "texto": "Opcion 3",
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
