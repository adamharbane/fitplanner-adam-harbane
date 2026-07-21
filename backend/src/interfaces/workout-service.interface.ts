import type { ScoredWorkout, Workout, WorkoutFilters } from "../models/workout.model.js";

export interface IWorkoutService {
  getWorkouts(filters: WorkoutFilters): ScoredWorkout[];
  getWorkoutById(id: number): Workout | null;
  getCategories(): string[];
}
