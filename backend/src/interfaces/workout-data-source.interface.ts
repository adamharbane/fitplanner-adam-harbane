import type { Workout } from "../models/workout.model.js";

export interface IWorkoutDataSource {
  getAll(): Workout[];
}
