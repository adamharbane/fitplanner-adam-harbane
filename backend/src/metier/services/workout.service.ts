import type { Workout, WorkoutFilters } from "../../models/workout.model.js";
import type { IWorkoutRepository } from "../../interfaces/workout-repository.interface.js";
import type { IWorkoutService } from "../../interfaces/workout-service.interface.js";
import { WorkoutFilterFactory } from "../filters/workout-filter.factory.js";
import { WorkoutFilterPipeline } from "../filters/workout-filter.pipeline.js";

export class WorkoutService implements IWorkoutService {
  constructor(private readonly repository: IWorkoutRepository) {}

  getWorkouts(filters: WorkoutFilters): Workout[] {
    const strategies = WorkoutFilterFactory.createFromFilters(filters);
    const pipeline = new WorkoutFilterPipeline(strategies);

    const result = pipeline.apply(this.repository.findAll());

    return result.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  getWorkoutById(id: number): Workout | null {
    return this.repository.findById(id) ?? null;
  }

  getCategories(): string[] {
    const categories = this.repository
      .findAll()
      .map((workout) => workout.category);

    return [...new Set(categories)].sort((a, b) => a.localeCompare(b, "fr"));
  }
}
