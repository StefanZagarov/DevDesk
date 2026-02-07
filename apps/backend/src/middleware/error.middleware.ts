import { z } from "@devdesk/shared";
import { Request, Response, NextFunction } from "express";
import { AppError } from "src/utils/errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle custom errors
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    });
  }

  // Handle Zod errors
  if (error instanceof z.ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: error.issues,
    });
  }

  // Everything else is onbscure error - don't leak details to the client
  console.error("Unexpected error:", error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
