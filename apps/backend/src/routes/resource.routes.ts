import { Router } from "express";
import { createResource } from "../controllers/resource.controller";
import { requireAuth } from "../middleware/auth.middleware";

const resourceRouter = Router();

resourceRouter.post("/", requireAuth, createResource);

export default resourceRouter;
