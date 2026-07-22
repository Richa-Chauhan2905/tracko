import express, {type Express} from "express";
import authRoutes from "./app/auth/auth.routes.js";

const app: Express = express();

app.use(express.json());

app.use("/auth", authRoutes);

export default app;