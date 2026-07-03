import { Router } from "express";
import { workoutRoutes } from "./workout.routes.js";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

apiRoutes.use("/workouts", workoutRoutes);
