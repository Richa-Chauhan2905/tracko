import { db } from "../../db/index.js";
import { locations } from "../../db/schema.js";

export async function createLocation(data: {
  tripId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}) {
  const [location] = await db
    .insert(locations)
    .values({
      tripId: data.tripId,
      latitude: data.latitude,
      longitude: data.longitude,
      accuracy: data.accuracy,
    })
    .returning();

  if (!location) {
    throw new Error("Failed to create location");
  }

  return location;
}
