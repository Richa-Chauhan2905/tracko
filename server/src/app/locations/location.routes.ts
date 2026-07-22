import { Router } from "express";

import { addLocation } from "./locations.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router: Router = Router();

router.post("/", authMiddleware, addLocation);

export default router;
