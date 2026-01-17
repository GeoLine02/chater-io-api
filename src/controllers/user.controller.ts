import { Request, Response } from "express";
import { getUser } from "../services/user.service";

export async function getUserController(req: Request, res: Response) {
  try {
    const accessToken = req.cookies?.accessToken;

    const user = await getUser(accessToken);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    const err = error as Error;

    switch (err.message) {
      case "TOKEN_MISSING":
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });

      case "INVALID_TOKEN":
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });

      case "INVALID_TOKEN_PAYLOAD":
        return res.status(401).json({
          success: false,
          message: "Invalid token payload",
        });

      case "USER_NOT_FOUND":
        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      default:
        console.error("GET /user/me error:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
    }
  }
}
