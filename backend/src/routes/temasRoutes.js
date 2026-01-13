import express from "express";
import * as quizController from "../controllers/temasController.js";

const router = express.Router();

router.use(express.json());

router.get("/", quizController.getThemes);
export default router;
