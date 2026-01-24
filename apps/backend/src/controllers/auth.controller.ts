import { Request, Response } from "express";
import { RegisterSchema, LoginSchema, z } from "@devdesk/shared";
import { UserModel } from "../models/user.model";
import { toHash, compare } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = RegisterSchema.parse(req.body);

    const existingUser = await UserModel.findByEmail(validatedData.email);
    if (existingUser) {
      res.status(409).json({
        status: "error",
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.issues,
      });
      return;
    }

    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // First we validdate the form data
    const validatedData = LoginSchema.parse(req.body);

    // Then we check if the user exists in our database
    const user = await UserModel.findByEmailWithPassword(validatedData.email);

    if (!user || !(await compare(validatedData.password, user.passwordHash))) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });

      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // If user exists and password is correct, then we proceed to create a sanitized user object which we will return, making sure we do not send any sensitive data like the hashed password
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    // Finally we send a response saying that all is ok (200) and we give the user to the requester (the front-end)
    res.status(200).json({
      status: "success",
      data: {
        user: safeUser,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.issues,
      });
      return;
    }
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
