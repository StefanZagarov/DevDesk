import { Request, Response } from "express";
import { ResourceModel } from "../models/resource.model";
import { CreateResourceSchema, UpdateResourceSchema } from "@devdesk/shared";
import { z } from "@devdesk/shared";
import { asyncHandler } from "src/utils/asyncHandler";
import { NotFoundError } from "src/utils/errors";

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

export const getAllResources = asyncHandler(async (req, res) => {
  const filters = {
    type: req.query.type as string | undefined,
    isFavorite: req.query.favorite === "true" ? true : undefined,
    isArchived: req.query.archived === "true" ? true : undefined,
    tags: req.query.tags ? (req.query.tags as string).split(",") : undefined,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
    sortBy: req.query.sortBy as string | undefined,
    sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
  };

  const resources = await ResourceModel.findByUserId(req.user!.id, filters);

  res.json({
    status: "success",
    data: { resources },
  });
});

export const getResourceById = asyncHandler(async (req, res) => {
  const resource = await ResourceModel.findById(req.params.id, req.user!.id);

  if (!resource) throw new NotFoundError("ResourceNotFound"); // asyncHandler catches the error and sends the 404 JSON response

  res.json({ status: "success", data: { resource } });
});

export const updateResource = asyncHandler(async (req, res) => {
  const validatedData = UpdateResourceSchema.parse(req.body);

  const updated = await ResourceModel.update(
    req.params.id,
    req.user!.id,
    validatedData,
  );

  if (!updated) throw new NotFoundError("ResourceNotFound");

  res.json({ status: "success", data: { resource: updated } });
});

export const deleteResource = asyncHandler(async (req, res) => {
  const deleted = await ResourceModel.delete(req.params.id, req.user!.id);

  if (!deleted) throw new NotFoundError("Resource not found");

  res.status(204).send();
});
