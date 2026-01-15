import express from "express";
import * as collectionController from "../controllers/collectionController.js";

const router = express.Router();

router.use(express.json());

router.get("/", collectionController.getCollections);
router.post("/", collectionController.addCollection);
router.put("/:id", collectionController.editCollection);
router.delete("/:id", collectionController.removeCollection);

export default router;
