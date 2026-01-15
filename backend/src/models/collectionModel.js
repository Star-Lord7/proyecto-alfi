import prisma from "../config/prismaConfig.js";

const getAllCollections = async () => {
  try {
    const collections = await prisma.coleccion.findMany({
      select: {
        titulo: true,
        descripcion: true,
        cantidad_tarjetas: true,
        tema: {
          select: {
            nombre: true,
          },
        },
      },
      where: {
        estado: "ACTIVA",
      },
    });
    return collections;
  } catch (error) {
    throw new Error("Error en collectionModel: " + error.message);
  }
};

const createCollection = async (collectionData) => {
  try {
    const newCollection = await prisma.coleccion.create({
      data: collectionData,
    });
    return newCollection;
  } catch (error) {
    throw new Error("Error en collectionModel: " + error.message);
  }
};

const updateCollection = async (id, updateData) => {
  try {
    const idParse = parseInt(id, 10);
    const updatedCollection = await prisma.coleccion.update({
      where: {
        id: idParse,
      },
      data: updateData,
    });
    return updatedCollection;
  } catch (error) {
    throw new Error("Error en collectionModel: " + error.message);
  }
};

const deleteCollection = async (id) => {
  try {
    const idParse = parseInt(id, 10);
    await prisma.coleccion.update({
      where: {
        id: idParse,
      },
      data: {
        estado: "INACTIVA",
        deleted_at: new Date(),
      },
    });
  } catch (error) {
    throw new Error("Error en collectionModel: " + error.message);
  }
};

export {
  getAllCollections,
  createCollection,
  updateCollection,
  deleteCollection,
};
