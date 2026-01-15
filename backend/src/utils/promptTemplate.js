export const cardPromptTemplate = ({
  categoria,
  segmento,
  nivel = "BASICO",
  coleccion = "General",
  //   pais = "general",
}) => `
Eres un experto en educación financiera y diseño de juegos educativos.

OBJETIVO
Crear UNA tarjeta educativa gamificada de finanzas.

CONTEXTO
- Categoría: ${categoria}
- Segmento: ${segmento}
- Nivel: ${nivel}
- Colección: ${coleccion}

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
