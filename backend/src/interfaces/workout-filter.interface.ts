import type { Workout } from "../models/workout.model.js";

export interface IWorkoutFilter {
  apply(workouts: Workout[]): Workout[];
}
