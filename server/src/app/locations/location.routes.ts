import { Router } from "express";

import { addLocation } from "./locations.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { currentLocation } from "./locations.controller.js";

const router: Router = Router();

router.post("/", authMiddleware, addLocation);
router.get("/current", authMiddleware, currentLocation);

export default router;
