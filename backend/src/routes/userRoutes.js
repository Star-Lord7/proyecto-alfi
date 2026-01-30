import express from "express";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createUserSchema } from "../schemas/userSchema.js";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(express.json());

// USER
router.get("/:id", userController.getUserById);
router.post("/", validateSchema(createUserSchema), userController.addUser);

// (USER y ADMIN)
router.put("/:id", userController.editUser);

// ADMIN
router.get("/", userController.getUsers);
router.delete("/:id", userController.removeUser);

export default router;
