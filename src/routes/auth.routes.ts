import express from "express";
import {
  createUserController,
  loginUserController,
  refreshTokenController,
} from "../controllers/auth.controller";

import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validations/auth";
const router = express.Router();

router.post("/register", validateRequest(registerSchema), createUserController);
router.post("/login", validateRequest(loginSchema), loginUserController);
router.get("/refresh", refreshTokenController);

export default router;
