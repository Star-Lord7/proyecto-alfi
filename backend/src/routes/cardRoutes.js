import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.use(express.json());

//ADMIN
router.post("/revisar", cardController.getAllCardsForReview);
router.post("/", cardController.addCard);
router.post("/estado", cardController.changeCardState);
router.put("/:id", cardController.editCard);
router.delete("/:id", cardController.removeCard);
//USER
router.get("/:coleccionId", cardController.getAllCardsByCollectionId);

export default router;
