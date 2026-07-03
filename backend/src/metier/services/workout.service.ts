import type {
  Workout,
  WorkoutFilters,
} from "../../models/workout.model.js";
import {
  findAllWorkouts,
  findWorkoutById,
} from "../../acces-donnees/repositories/workout.repository.js";

export function getWorkouts(filters: WorkoutFilters): Workout[] {
  let result = findAllWorkouts();

  if (filters.category) {
    result = result.filter((workout) => workout.category === filters.category);
  }

  if (filters.maxDuration !== undefined) {
    result = result.filter((workout) => workout.duration <= filters.maxDuration!);
  }

  return result.sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function getWorkoutById(id: number): Workout | null {
  return findWorkoutById(id) ?? null;
}

export function getCategories(): string[] {
  const categories = findAllWorkouts().map((workout) => workout.category);
  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories.sort((a, b) => a.localeCompare(b, "fr"));
}
