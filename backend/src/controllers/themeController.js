import * as themeModel from "../models/themeModel.js";

// Método para obtener todos los temas
const getThemes = async (req, res) => {
  try {
    const themes = await themeModel.getAllThemes();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para agregar un nuevo tema
const addTheme = async (req, res) => {
  try {
    const themeData = req.body;
    const newTheme = await themeModel.createTheme(themeData);
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para editar un tema existente
const editTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTheme = await themeModel.updateTheme(id, updateData);
    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para eliminar un tema
const removeTheme = async (req, res) => {
  try {
    const { id } = req.params;
    await themeModel.deleteTheme(id);
    res.status(200).json({
      message: "Tema eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getThemes, addTheme, editTheme, removeTheme };
