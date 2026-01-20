import { Router } from "express";
import { createResource } from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter.post("/", createResource);

export default resourceRouter;
