import type { Workout } from "../../models/workout.model.js";
import type { IWorkoutFilter } from "../../interfaces/workout-filter.interface.js";

export class WorkoutFilterPipeline implements IWorkoutFilter {
  constructor(private readonly filters: IWorkoutFilter[]) {}

  apply(workouts: Workout[]): Workout[] {
    return this.filters.reduce(
      (result, filter) => filter.apply(result),
      workouts,
    );
  }
}
