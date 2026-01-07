import express from "express";
import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.get("/card", cardController.createPrompt);
export default router;
