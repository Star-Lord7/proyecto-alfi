import express from "express";
import * as quizController from "../controllers/temaController.js";

const router = express.Router();

router.use(express.json());

router.get("/", quizController.getThemes);
router.post("/", quizController.addTheme);
router.put("/:id", quizController.editTheme);
router.delete("/:id", quizController.removeTheme);

export default router;
