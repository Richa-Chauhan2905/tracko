import { kafka } from "./kafka.client.js";
import { db } from "../../db/index.js";
import { locations } from "../../db/schema.js";

const consumer = kafka.consumer({
  groupId: "location-consumer",
});

export async function startLocationConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "location-events",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        return;
      }

      const data = JSON.parse(message.value.toString());

      await db.insert(locations).values({
        tripId: data.tripId,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
      });

      console.log("Location stored:", data);
    },
  });
}
