import prisma from "../config/prismaConfig.js";

const getAllThemes = async () => {
  try {
    const themes = await prisma.tema.findMany({
      select: {
        nombre: true,
        descripcion: true,
      },
      where: {
        estado: true,
      },
    });
    return themes;
  } catch (error) {
    throw new Error("Error en quizModel: " + error.message);
  }
};

const getThemeByName = async (name) => {
  try {
    const theme = await prisma.tema.findUnique({
      where: {
        nombre: name,
      },
    });
    return theme;
  } catch (error) {
    throw new Error("Error en quizModel: " + error.message);
  }
};

const createTheme = async (themeData) => {
  try {
    const newTheme = await prisma.tema.create({
      data: themeData,
    });
    return newTheme;
  } catch (error) {
    throw new Error("Error en quizModel: " + error.message);
  }
};

const updateTheme = async (name, updateData) => {
  try {
    const updatedTheme = await prisma.tema.update({
      where: {
        nombre: name,
      },
      data: updateData,
    });
    return updatedTheme;
  } catch (error) {
    throw new Error("Error en quizModel: " + error.message);
  }
};

const deleteTheme = async (name) => {
  try {
    const deletedTheme = await prisma.tema.update({
      where: {
        nombre: name,
      },
      data: {
        estado: false,
      },
    });
    return deletedTheme;
  } catch (error) {
    throw new Error("Error en quizModel: " + error.message);
  }
};

export { getAllThemes, getThemeByName, createTheme, updateTheme, deleteTheme };
