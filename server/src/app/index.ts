import "dotenv/config";

import app from "../app.js";
import { startLocationConsumer } from "./kafka/consumer.js";

const PORT = 8000;

async function startServer() {
  try {
    await startLocationConsumer();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
