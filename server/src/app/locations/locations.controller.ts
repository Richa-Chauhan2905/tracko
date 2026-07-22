import type { Request, Response } from "express";

import { createLocation } from "./locations.services.js";

export async function addLocation(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { tripId, latitude, longitude, accuracy } = req.body;

    if (!tripId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Missing location data",
      });
    }

    const location = await createLocation({
      tripId,
      latitude,
      longitude,
      accuracy,
    });

    return res.status(201).json({
      message: "Location added",
      location,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add location",
    });
  }
}
