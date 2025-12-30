import index from '../services/apiService.js';

const finanzas = async () => {
  try {
    const response = await index(`
      Genera UNA pregunta sobre finanzas para emprendedores.

      Devuelve la respuesta EXCLUSIVAMENTE en formato JSON válido.
      NO incluyas texto adicional.
      NO uses comillas dobles dentro de los textos.
      NO uses saltos de línea dentro de los valores.

      Estructura obligatoria:
      {
        "titulo": "Titulo corto",
        "pregunta": "Texto de la pregunta",
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

      Reglas:
      - Solo una opcion correcta
      - Tres opciones exactas
    `);

    //LIMPIEZA DEL JSON RECIBIDO 
    const cleanResponse = response
      .trim()
      .replace(/```json|```/g, '');

    return JSON.parse(cleanResponse);

  } catch (error) {
    console.error("Respuesta cruda IA:", error);
    throw new Error("Error en finanzasModel: " + error.message);
  }
};

export { finanzas };