import { kafka } from "./kafka.client.js";

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}

export async function sendLocationEvent(data: {
  tripId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}) {
  await producer.send({
    topic: "location-events",
    messages: [
      {
        key: data.tripId,
        value: JSON.stringify(data),
      },
    ],
  });
}
