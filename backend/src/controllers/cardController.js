import * as cardModel from "../models/cardModel.js";

// Método para obtener todas las tarjetas de una colección específica
const getAllCardsByCollectionId = async (req, res) => {
  try {
    const { coleccionId } = req.params;
    const cards = await cardModel.getCardsByCollectionId(coleccionId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCardsForReview = async (req, res) => {
  try {
    const { estado } = req.body;
    const cards = await cardModel.getCardsForReview(estado);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para agregar una nueva tarjeta
const addCard = async (req, res) => {
  try {
    // Extraemos los datos necesarios del cuerpo de la solicitud
    const { segmento, coleccionId, dificultad } = req.body;

    // Se los pasamos al modelo para crear la tarjeta
    const tarjeta = await cardModel.createCard({
      // categoria,
      // nivel,
      segmento,
      coleccionId,
      dificultad: dificultad || "BASICO", // Valor por defecto si no se proporciona
      //   pais,
    });

    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeCardState = async (req, res) => {
  try {
    const { id, nuevoEstado } = req.body;
    const updatedCard = await cardModel.updateCard(id, { estado: nuevoEstado });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para editar una tarjeta existente
const editCard = async (req, res) => {
  try {
    // Extraemos el ID de la tarjeta de los parámetros de la ruta
    const { id } = req.params;
    // Extraemos los datos de actualización del cuerpo de la solicitud
    const updateData = req.body;
    // Le pasamos los datos al modelo para actualizar la tarjeta
    const updatedCard = await cardModel.updateCard(id, updateData);
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para eliminar una tarjeta
const removeCard = async (req, res) => {
  try {
    const { id } = req.params;
    await cardModel.deleteCard(id);
    res.status(200).json({
      message: "Tarjeta eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllCardsByCollectionId,
  getAllCardsForReview,
  addCard,
  changeCardState,
  editCard,
  removeCard,
};
