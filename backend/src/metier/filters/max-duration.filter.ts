import type { Workout } from "../../models/workout.model.js";
import type { IWorkoutFilter } from "../../interfaces/workout-filter.interface.js";

export class MaxDurationFilter implements IWorkoutFilter {
  constructor(private readonly maxDuration: number) {}

  apply(workouts: Workout[]): Workout[] {
    return workouts.filter((workout) => workout.duration <= this.maxDuration);
  }
}
