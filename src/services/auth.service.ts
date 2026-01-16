import { User } from "../sequelize/models/user";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UserCreatePayload, UserLoginPayload } from "../types/auth";
import { Request } from "express";
import jwt from "jsonwebtoken";

export async function createUser(data: UserCreatePayload) {
  const { email, username, password } = data;

  const existingEmail = await User.findOne({ where: { email } });
  console.log(existingEmail);
  if (existingEmail) {
    throw new Error("EMAIL_EXISTS");
  }

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error("USERNAME_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, password: hashedPassword });

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  return { user, accessToken, refreshToken };
}

export async function loginUser(data: UserLoginPayload) {
  const { username, password } = data;

  const existingUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!existingUser) {
    throw new Error("WRONG_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("WRONG_CREDENTIALS");
  }

  const accessToken = generateAccessToken({ id: existingUser.id });
  const refreshToken = generateRefreshToken({ id: existingUser.id });

  return { user: existingUser, accessToken, refreshToken };
}

interface RefreshTokenPayload {
  id: string;
}

export async function refreshAccessToken(req: Request) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new Error("NO_REFRESH_TOKEN");
  }

  let payload: RefreshTokenPayload;

  try {
    payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as RefreshTokenPayload;
  } catch {
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  const newAccessToken = generateAccessToken({ id: payload.id });

  return {
    accessToken: newAccessToken,
  };
}
