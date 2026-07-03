import { Router } from "express";
import type { WorkoutController } from "../controllers/workout.controller.js";
import { ApiResponseBuilder } from "../../models/api-response.model.js";
import { createWorkoutRoutes } from "./workout.routes.js";

export class ApiRouter {
  readonly router: Router;

  constructor(workoutController: WorkoutController) {
    this.router = Router();
    this.registerRoutes(workoutController);
  }

  private registerRoutes(workoutController: WorkoutController): void {
    this.router.get("/health", (_req, res) => {
      res.json(ApiResponseBuilder.success({ status: "ok" }));
    });

    this.router.use("/workouts", createWorkoutRoutes(workoutController));
  }
}
