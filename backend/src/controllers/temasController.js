import * as quizModel from "../models/temasModel.js";

const getThemes = async (req, res) => {
  try {
    const themes = await quizModel.getAllThemes();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getThemes };
