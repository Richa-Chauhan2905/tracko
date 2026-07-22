import express, { type Express } from "express";
import authRoutes from "./app/auth/auth.routes.js";
import tripRoutes from "./app/trips/trips.routes.js";

const app: Express = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/trips", tripRoutes);

export default app;
