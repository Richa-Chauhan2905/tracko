import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "tracko-server",
  brokers: ["localhost:9092"],
});
