import { eq, and } from "drizzle-orm";

import { db } from "../../db/index.js";
import { trips } from "../../db/schema.js";

export async function createTrip(userId: string) {
  const [trip] = await db
    .insert(trips)
    .values({
      userId,
      status: "ACTIVE",
    })
    .returning();

  if (!trip) {
    throw new Error("Failed to create trip");
  }

  return trip;
}

export async function endTrip(tripId: string, userId: string) {
  const [trip] = await db
    .update(trips)
    .set({
      status: "COMPLETED",
      endedAt: new Date(),
    })
    .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
    .returning();

  if (!trip) {
    throw new Error("Trip not found");
  }

  return trip;
}

export async function getCurrentTrip(userId: string) {
  const [trip] = await db
    .select()
    .from(trips)
    .where(and(eq(trips.userId, userId), eq(trips.status, "ACTIVE")));

  return trip ?? null;
}
