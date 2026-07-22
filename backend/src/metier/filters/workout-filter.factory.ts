import type { WorkoutFilters } from "../../models/workout.model.js";
import type { IWorkoutFilter } from "../../interfaces/workout-filter.interface.js";
import { CategoryFilter } from "./category.filter.js";
import { MaxDurationFilter } from "./max-duration.filter.js";

type FilterKind = "category" | "maxDuration";

export class WorkoutFilterFactory {
  static createFromFilters(filters: WorkoutFilters): IWorkoutFilter[] {
    const strategies: IWorkoutFilter[] = [];
    const kinds = this.resolveActiveKinds(filters);

    for (const kind of kinds) {
      switch (kind) {
        case "category":
          strategies.push(new CategoryFilter(filters.category!));
          break;
        case "maxDuration":
          strategies.push(new MaxDurationFilter(filters.maxDuration!));
          break;
      }
    }

    return strategies;
  }

  private static resolveActiveKinds(filters: WorkoutFilters): FilterKind[] {
    const kinds: FilterKind[] = [];

    if (filters.category) {
      kinds.push("category");
    }

    if (filters.maxDuration !== undefined) {
      kinds.push("maxDuration");
    }

    return kinds;
  }
}
