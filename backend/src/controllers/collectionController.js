import * as colectionModel from "../models/collectionModel.js";

// Método para obtener todas las colecciones
const getAllCollections = async (req, res) => {
  try {
    const collections = await colectionModel.getAllCollections();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener una colección por ID
const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await colectionModel.getCollectionById(id);
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para agregar una nueva colección
const addCollection = async (req, res) => {
  try {
    const collectionData = req.body;
    const newCollection = await colectionModel.createCollection(collectionData);
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para editar una colección existente
const editCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCollection = await colectionModel.updateCollection(
      id,
      updateData
    );
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para eliminar una colección
const removeCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await colectionModel.deleteCollection(id);
    res.status(200).json({
      message: "Colección eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener colecciones por tema
const getCollectionsByTheme = async (req, res) => {
  try {
    const { temaId } = req.params;
    const colecciones = await colectionModel.findByThemeId(temaId);
    res.json(colecciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  getAllCollections,
  getCollectionById,
  addCollection,
  editCollection,
  removeCollection,
  getCollectionsByTheme,
};
