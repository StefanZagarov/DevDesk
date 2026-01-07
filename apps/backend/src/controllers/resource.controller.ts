import { Request, Response } from "express";
import { ResourceModel } from "../models/resource.model";

export const createResource = async (req: Request, res: Response) => {
  try {
    // TODO: We will add Zod validation here in the next step
    const { title, description, type, content, tags } = req.body;

    // Basic check
    if (!title || !type || !content) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newResource = await ResourceModel.create({
      title,
      description,
      type,
      content,
      tags
    });

    res.status(201).json({
      status: "success",
      data: newResource
    });
  } catch (err) {
    console.error("Error creating resource:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
