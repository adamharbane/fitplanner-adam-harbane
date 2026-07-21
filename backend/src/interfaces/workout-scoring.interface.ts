import type { ScoredWorkout, Workout } from "../models/workout.model.js";

export interface IScoringStrategy {
  score(workouts: Workout[], favoriteIds: number[]): ScoredWorkout[];
}
