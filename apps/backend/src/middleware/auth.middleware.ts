import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "default_secret";

interface JWTPayload {
  id: string;
  email: string;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .json({ status: "error", message: "Authorization header missing" });
    return;
  }

  // Parse the Bearer <token>
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: "error", message: "Token is missing" });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    res
      .status(403)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};
