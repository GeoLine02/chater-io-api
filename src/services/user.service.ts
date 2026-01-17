import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../sequelize/models/user";

export async function getUser(accessToken?: string) {
  if (!accessToken) {
    throw new Error("TOKEN_MISSING");
  }

  let payload: JwtPayload;

  try {
    payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;
  } catch {
    throw new Error("INVALID_TOKEN");
  }

  const userId = payload.id;

  if (!userId) {
    throw new Error("INVALID_TOKEN_PAYLOAD");
  }

  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "username"],
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}
