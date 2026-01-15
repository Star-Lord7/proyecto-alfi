import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.use(express.json());

router.get("/:coleccionId", cardController.getAllCardsByCollectionId);
router.post("/", cardController.addCard);
router.put("/:id", cardController.editCard);
router.delete("/:id", cardController.removeCard);

export default router;
