import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import * as collectionController from "../controllers/collectionController.js";

const router = express.Router();

router.use(express.json());

router.get("/", collectionController.getAllCollections);
router.get("/:id", collectionController.getCollectionById);
router.post("/", collectionController.addCollection);
router.put("/:id", collectionController.editCollection);
router.delete("/:id", collectionController.removeCollection);
router.get("/tema/:temaId", collectionController.getCollectionsByTheme); //colecciones por tema

export default router;
