import { Request, Response } from "express";
import { ResourceModel } from "../models/resource.model";
import { CreateResourceSchema } from "@devdesk/shared";
import { z } from "@devdesk/shared";

export const createResource = async (req: Request, res: Response) => {
  try {
    // Validation Layer
    const validatedData = CreateResourceSchema.parse(req.body);

    if (!req.user) {
      res
        .status(401)
        .json({ error: "Unauthorized resource creation: No user provided." });
      return;
    }

    // Data Layer
    const newResource = await ResourceModel.create(validatedData, req.user.id);

    res.status(201).json({
      status: "success",
      data: newResource,
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

    console.error("Error creating resource:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
