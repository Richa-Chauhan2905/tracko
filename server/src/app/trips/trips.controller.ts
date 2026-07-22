import type { Request, Response } from "express";

import { createTrip, endTrip, getCurrentTrip } from "./trips.services.js";

export async function startTrip(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const trip = await createTrip(userId);

    return res.status(201).json({
      message: "Trip started",
      trip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to start trip",
    });
  }
}

export async function finishTrip(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!tripId || Array.isArray(tripId)) {
      return res.status(400).json({
        message: "Invalid trip id",
      });
    }

    const trip = await endTrip(tripId, userId);

    return res.status(200).json({
      message: "Trip ended",
      trip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to end trip",
    });
  }
}

export async function currentTrip(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const trip = await getCurrentTrip(userId);

    return res.status(200).json({
      trip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch current trip",
    });
  }
}
