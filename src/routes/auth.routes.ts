import express from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validations/auth";
const router = express.Router();

router.post("/register", validateRequest(registerSchema), createUserController);
router.post("/login", validateRequest(loginSchema), loginUserController);

export default router;
