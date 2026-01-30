import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.use(express.json());

router.post("/login", validateSchema(loginSchema), authController.login);
router.post("/logout", verifyToken, authController.logout);

export default router;
