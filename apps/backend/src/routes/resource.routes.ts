import { Router } from "express";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../controllers/resource.controller";
import { requireAuth } from "../middleware/auth.middleware";

const resourceRouter = Router();

resourceRouter.post("/", requireAuth, createResource);
resourceRouter.get("/", requireAuth, getAllResources);
resourceRouter.get("/:id", requireAuth, getResourceById);
resourceRouter.patch("/:id", requireAuth, updateResource);
resourceRouter.delete("/:id", requireAuth, deleteResource);

export default resourceRouter;
