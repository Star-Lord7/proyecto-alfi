import express from "express";
import * as quizController from "../controllers/quizController.js";

const router = express.Router();

router.use(express.json());

router.post("/usuario/:usuarioId", quizController.userQuiz); //Puntaje

router.post("/start", quizController.startQuiz);
router.post("/start/respuestas", quizController.submitQuiz);

export default router;
