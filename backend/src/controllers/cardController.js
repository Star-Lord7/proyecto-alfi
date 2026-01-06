import * as cardModel from "../models/cardModel.js";

const createPrompt = async (req, res) => {
  try {
    const { categoria, segmento, nivel } = req.body;

    const tarjeta = await cardModel.createPromptTemplate({
      categoria,
      segmento,
      nivel,
      //   pais,
    });

    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPrompt };
