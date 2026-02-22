import { Request, Response } from "express";
import { RegisterSchema, LoginSchema, z } from "@devdesk/shared";
import { UserModel } from "../models/user.model";
import { toHash, compare } from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { asyncHandler } from "src/utils/asyncHandler";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "src/utils/errors";
import {
  createRefreshToken,
  deleteRefreshToken,
  findValidRefreshToken,
} from "src/models/refreshToken.model";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = RegisterSchema.parse(req.body);

  const existingUser = await UserModel.findByEmail(validatedData.email);

  if (existingUser) throw new ConflictError("Email is already registered");

  const hashedPassword = await toHash(validatedData.password);

  const newUser = await UserModel.create(validatedData, hashedPassword);

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  await createRefreshToken(newUser.id, refreshToken);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
      accessToken,
      refreshToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  // First we validdate the form data
  const validatedData = LoginSchema.parse(req.body);

  // Then we check if the user exists in our database
  const user = await UserModel.findByEmailWithPassword(validatedData.email);

  if (!user || !(await compare(validatedData.password, user.passwordHash)))
    throw new UnauthorizedError("Invalid email or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await createRefreshToken(user.id, refreshToken);

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
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ValidationError("Refresh token is required");

  const storedToken = await findValidRefreshToken(refreshToken);
  if (!storedToken)
    throw new UnauthorizedError("Invalid or expired refresh token");

  // Verify the JWT signature, make sure it was not tampered with
  let payload;
  try {
    payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as jwt.JwtPayload;
  } catch {
    // If tampered or malformed - delete from DB
    await deleteRefreshToken(refreshToken);
    throw new UnauthorizedError("Invalid refresh token");
  }
  const user = await UserModel.findById(payload.id);
  if (!user) throw new NotFoundError("No user found");
  const accessToken = generateAccessToken(user);

  res.json({
    status: "success",
    data: { accessToken },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) await deleteRefreshToken(refreshToken);

  res.json({
    status: "success",
    message: "Logged out successfully",
  });
});
