import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "src/utils/errors";

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
    return next(new UnauthorizedError("Authorization header missing"));
  }

  // Parse the Bearer <token>
  const token = authHeader!.split(" ")[1];

  if (!token) {
    return next(new UnauthorizedError("Token is missing"));
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
    next(new UnauthorizedError("Invalid or expired token"));
  }
};
