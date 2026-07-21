import type { WorkoutFilters } from "../../models/workout.model.js";
import type { IWorkoutFilter } from "../../interfaces/workout-filter.interface.js";
import { CategoryFilter } from "./category.filter.js";
import { MaxDurationFilter } from "./max-duration.filter.js";

export class WorkoutFilterFactory {
  static createFromFilters(filters: WorkoutFilters): IWorkoutFilter[] {
    const strategies: IWorkoutFilter[] = [];

    if (filters.category) {
      strategies.push(new CategoryFilter(filters.category));
    }

    if (filters.maxDuration !== undefined) {
      strategies.push(new MaxDurationFilter(filters.maxDuration));
    }

    return strategies;
  }
}
