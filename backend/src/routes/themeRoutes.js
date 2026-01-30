import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import * as themeController from "../controllers/themeController.js";

const router = express.Router();

router.use(express.json());

router.get("/", themeController.getThemes);
router.post("/", themeController.addTheme);
router.put("/:id", themeController.editTheme);
router.delete("/:id", themeController.removeTheme);

export default router;
