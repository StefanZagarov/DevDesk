import { Request, Response } from "express";
import { ResourceModel } from "../models/resource.model";
import { CreateResourceSchema } from "@devdesk/shared";
import { z } from "@devdesk/shared";
import { asyncHandler } from "src/utils/asyncHandler";

export const createResource = asyncHandler(
  async (req: Request, res: Response) => {
    // Validation Layer
    const validatedData = CreateResourceSchema.parse(req.body);

    // Data Layer
    const newResource = await ResourceModel.create(validatedData, req.user!.id);

    res.status(201).json({
      status: "success",
      data: newResource,
    });
  },
);
