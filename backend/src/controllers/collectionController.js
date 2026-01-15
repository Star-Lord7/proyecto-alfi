import * as colectionModel from "../models/collectionModel.js";

const getCollections = async (req, res) => {
  try {
    const collections = await colectionModel.getAllCollections();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCollection = async (req, res) => {
  try {
    const collectionData = req.body;
    const newCollection = await colectionModel.createCollection(collectionData);
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

export { getCollections, addCollection, editCollection, removeCollection };
