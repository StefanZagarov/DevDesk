import { Router } from "express";
import { createResource } from "../controllers/resource.controller";

const router = Router();

router.post("/", createResource);

export default router;
