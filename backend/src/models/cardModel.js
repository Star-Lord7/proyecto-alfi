import index from "../services/apiService.js";
import { cardPromptTemplate } from "../utils/promptTemplate.js";

const createPromptTemplate = async (params) => {
  try {
    const prompt = cardPromptTemplate(params);

    const response = await index(prompt);

    const raw = response.trim().replace(/```json|```/g, "");

    const parsed = JSON.parse(raw);

    return parsed;
  } catch (error) {
    throw new Error("Error en cardModel: " + error.message);
  }
};

export { createPromptTemplate };
