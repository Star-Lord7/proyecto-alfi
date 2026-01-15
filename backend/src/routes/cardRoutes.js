import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.use(express.json());

router.post("/card", cardController.createPrompt);
export default router;
