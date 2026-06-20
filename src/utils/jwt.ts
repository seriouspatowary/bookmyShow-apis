import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model";

interface JwtPayload {
  userId: string;
  role: UserRole;
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    process.env.ACCESS_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};