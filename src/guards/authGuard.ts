// middlewares/authGuard.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserJwtPayload extends jwt.JwtPayload {
  id: number;
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from cookies
    const accessToken = req.cookies?.accessToken;

    // Verify token
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(accessToken, secret) as UserJwtPayload;
    if (decoded) {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
      error,
    });
  }
};
