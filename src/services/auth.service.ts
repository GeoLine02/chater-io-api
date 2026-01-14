import { User } from "../sequelize/models/user";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UserCreatePayload, UserLoginPayload } from "../types/auth";

export async function createUser(data: UserCreatePayload) {
  const { email, username, password } = data;

  const existingEmail = await User.findOne({ where: { email } });
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
  const { email, password } = data;

  const existingUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    throw new Error("Email or password is incorrect");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect");
  }

  const accessToken = generateAccessToken({ id: existingUser.id });
  const refreshToken = generateRefreshToken({ id: existingUser.id });

  return { user: existingUser, accessToken, refreshToken };
}
