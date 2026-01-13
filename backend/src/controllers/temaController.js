import * as temaModel from "../models/temaModel.js";

const getThemes = async (req, res) => {
  try {
    const themes = await temaModel.getAllThemes();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTheme = async (req, res) => {
  try {
    const themeData = req.body;
    const newTheme = await temaModel.createTheme(themeData);
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTheme = await temaModel.updateTheme(id, updateData);
    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTheme = async (req, res) => {
  try {
    const { id } = req.params;
    await temaModel.deleteTheme(id);
    res.status(200).json({
      message: "Tema eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getThemes, addTheme, editTheme, removeTheme };
