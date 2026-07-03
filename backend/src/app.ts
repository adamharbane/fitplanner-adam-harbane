import cors from "cors";
import express from "express";
import { CORS_ORIGIN } from "./config/env.js";
import { apiRoutes } from "./presentation/routes/index.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(express.json());
  app.use("/api", apiRoutes);

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route introuvable" });
  });

  return app;
}
