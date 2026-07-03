import type { Workout, WorkoutFilters } from "../models/workout.model.js";

export interface IWorkoutService {
  getWorkouts(filters: WorkoutFilters): Workout[];
  getWorkoutById(id: number): Workout | null;
  getCategories(): string[];
}
