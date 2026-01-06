import * as cardModel from "../models/cardModel.js";

const createPrompt = async (req, res) => {
  try {
    const { categoria, segmento, nivel } = req.query;

    const mensaje = await cardModel.createPromptTemplate({
      categoria,
      segmento,
      nivel,
      //   pais,
    });

    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPrompt };
