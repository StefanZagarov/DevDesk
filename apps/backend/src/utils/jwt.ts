import jwt from "jsonwebtoken";
import { User } from "@devdesk/shared";

// Generate Access Token (15 minutes)
export const generateAccessToken = (user: User) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined in .env");
  }

  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// Generate Refresh Token (7 days)
export const generateRefreshToken = (user: User) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined in .env");
  }

  return jwt.sign(
    { id: user.id }, // Refresh token usually just needs ID
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};
