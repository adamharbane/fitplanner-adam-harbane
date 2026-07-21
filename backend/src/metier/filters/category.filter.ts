import type { Workout } from "../../models/workout.model.js";
import type { IWorkoutFilter } from "../../interfaces/workout-filter.interface.js";

export class CategoryFilter implements IWorkoutFilter {
  constructor(private readonly category: string) {}

  apply(workouts: Workout[]): Workout[] {
    return workouts.filter((workout) => workout.category === this.category);
  }
}
