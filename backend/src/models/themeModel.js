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
    throw new Error("Error en temaModel: " + error.message);
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
    throw new Error("Error en temaModel: " + error.message);
  }
};

const createTheme = async (themeData) => {
  try {
    const newTheme = await prisma.tema.create({
      data: themeData,
    });
    return newTheme;
  } catch (error) {
    throw new Error("Error en temaModel: " + error.message);
  }
};

const updateTheme = async (id, updateData) => {
  try {
    const idParse = parseInt(id, 10);
    const updatedTheme = await prisma.tema.update({
      where: {
        id: idParse,
      },
      data: updateData,
    });
    return updatedTheme;
  } catch (error) {
    throw new Error("Error en temaModel: " + error.message);
  }
};

const deleteTheme = async (id) => {
  try {
    const idParse = parseInt(id, 10);
    const deletedTheme = await prisma.tema.update({
      where: {
        id: idParse,
      },
      data: {
        estado: false,
        deleted_at: new Date(),
      },
    });
    return deletedTheme;
  } catch (error) {
    throw new Error("Error en temaModel: " + error.message);
  }
};

export { getAllThemes, getThemeByName, createTheme, updateTheme, deleteTheme };
