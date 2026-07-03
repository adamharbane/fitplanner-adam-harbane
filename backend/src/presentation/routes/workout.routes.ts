import { Router } from "express";
import {
  getAllCategories,
  getAllWorkouts,
  getOneWorkout,
} from "../controllers/workout.controller.js";

export const workoutRoutes = Router();

workoutRoutes.get("/categories", getAllCategories);
workoutRoutes.get("/", getAllWorkouts);
workoutRoutes.get("/:id", getOneWorkout);
