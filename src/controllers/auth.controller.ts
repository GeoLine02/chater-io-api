import { Request, Response } from "express";
import {
  createUser,
  loginUser,
  refreshAccessToken,
} from "../services/auth.service";

export async function createUserController(req: Request, res: Response) {
  try {
    console.log("reaches");
    const result = await createUser(req.body);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", result.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    res.cookie("refreshToken", result.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    const { password: _, ...userWithoutPassword } = result.user.get({
      plain: true,
    });

    return res.status(201).json({ user: userWithoutPassword });
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "EMAIL_EXISTS") {
      console.log("enters");
      return res.status(400).json({
        type: "existingEmail",
        message: "User with this email already exists",
      });
    }
    if (error.message === "USERNAME_EXISTS") {
      return res.status(400).json({
        type: "existingUsername",
        message: "User with this username already exists",
      });
    }
    console.error("Create user error:", error);
    return res.status(500).json({ message: "Unable to create user" });
  }
}

export async function loginUserController(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);
    console.log("result", result);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", result.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    res.cookie("refreshToken", result.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    const { password: _, ...userWithoutPassword } = result.user.get({
      plain: true,
    });

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    if (error.message === "WRONG_CREDENTIALS") {
      return res.status(400).json({
        type: "incorrectCreds",
        message: "Email or password is incorrect",
      });
    }

    return res.status(500).json({
      message: "Unable to login",
    });
  }
}

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const response = await refreshAccessToken(req);
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", response.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    if (response.accessToken) {
      return res.json({
        message: "access token refreshed",
      });
    }
  } catch (error: any) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
