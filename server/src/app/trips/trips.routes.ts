import { Router } from "express";

import { startTrip, finishTrip, currentTrip } from "./trips.controller.js";

import { authMiddleware } from "../auth/auth.middleware.js";

const router: Router = Router();

router.post("/start", authMiddleware, startTrip);

router.patch("/:id/end", authMiddleware, finishTrip);

router.get("/current", authMiddleware, currentTrip);

export default router;
