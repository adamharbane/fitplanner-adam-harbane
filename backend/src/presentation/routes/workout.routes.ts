import { Router } from "express";
import type { WorkoutController } from "../controllers/workout.controller.js";

export function createWorkoutRoutes(controller: WorkoutController): Router {
  const router = Router();

  router.get(
    "/categories",
    controller.getAllCategories.bind(controller),
  );
  router.get("/", controller.getAllWorkouts.bind(controller));
  router.get("/:id", controller.getOneWorkout.bind(controller));

  return router;
}
