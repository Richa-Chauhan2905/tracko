import type { Request, Response } from "express";
import { db } from "../../db/index.js";
import { locations } from "../../db/schema.js";
import { createLocation } from "./locations.services.js";
import { eq, desc } from "drizzle-orm";
import { trips, users } from "../../db/schema.js";

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
    console.error("LOCATION ERROR:", error);

    return res.status(500).json({
      message: "Location failed",
    });
  }
}

export async function currentLocation(req: Request, res: Response) {
  try {
    const latestLocation = await db
      .select({
        latitude: locations.latitude,
        longitude: locations.longitude,
        accuracy: locations.accuracy,
        recordedAt: locations.recordedAt,
        name: users.name,
        profilePicture: users.profilePicture,
      })
      .from(locations)
      .innerJoin(trips, eq(locations.tripId, trips.id))
      .innerJoin(users, eq(trips.userId, users.id))
      .orderBy(desc(locations.recordedAt))
      .limit(1);

    if (!latestLocation.length) {
      return res.status(404).json({
        message: "No location found",
      });
    }

    return res.json(latestLocation[0]);
  } catch (error) {
    console.error("CURRENT LOCATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to get location",
    });
  }
}
