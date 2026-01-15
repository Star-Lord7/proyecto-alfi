import prisma from "../config/prismaConfig.js";

// Método para obtener todas las colecciones
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

// Método para obtener una colección por ID
const getCollectionById = async (id) => {
  try {
    const idParse = parseInt(id, 10);
    const collection = await prisma.coleccion.findUnique({
      where: {
        id: idParse,
      },
    });
    return collection;
  } catch (error) {
    throw new Error("Error en collectionModel: " + error.message);
  }
};

// Método para crear una nueva colección
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

// Método para actualizar una colección existente
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

// Método para eliminar una colección (cambio de estado a INACTIVA)
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
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
