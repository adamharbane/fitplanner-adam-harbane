import type { Workout } from "../../models/workout.model.js";
import { workouts } from "../sources/workout.source.js";

export function findAllWorkouts(): Workout[] {
  return workouts;
}

export function findWorkoutById(id: number): Workout | undefined {
  return workouts.find((workout) => workout.id === id);
}
