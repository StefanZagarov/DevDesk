import { Request, Response } from "express";
import { RegisterSchema, z } from "@devdesk/shared";
import { UserModel } from "../models/user.model";
import { toHash, compare } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = RegisterSchema.parse(req.body);

    const existingUser = await UserModel.findByEmail(validatedData.email);
    if (existingUser) {
      res.status(409).json({
        statis: "error",
        message: "Email already in use",
      });
      return;
    }

    const hashedPassword = await toHash(validatedData.password);

    const newUser = await UserModel.create(validatedData, hashedPassword);

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: err.issues,
      });
      return;
    }

    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
