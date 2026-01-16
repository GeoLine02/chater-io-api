import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (paylaod: Object) => {
  const accessToken = jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10s",
  });
  return accessToken;
};

export const generateRefreshToken = (payload: Object) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  return refreshToken;
};
