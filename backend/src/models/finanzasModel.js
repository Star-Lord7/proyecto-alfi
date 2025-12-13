import index from '../services/apiService.js';

const finanzas = async () => {
  try {
    const response = await index(`Proporciona una pregunta sobre finanzas y ofrece 3 posibles respuestas
      y aparte ofrece las explicaciones de cada una y a aparte muestra la respuesta correcta.`);
    return response;
  } catch (error) {
    throw new Error("Error en finanzasModel: " + error.message);
  }
}

export { finanzas };