import type { ScoredWorkout, WorkoutFilters } from "../../models/workout.model.js";
import type { IWorkoutRepository } from "../../interfaces/workout-repository.interface.js";
import type { IWorkoutService } from "../../interfaces/workout-service.interface.js";
import type { IScoringStrategy } from "../../interfaces/workout-scoring.interface.js";
import { WorkoutFilterFactory } from "../filters/workout-filter.factory.js";
import { WorkoutFilterPipeline } from "../filters/workout-filter.pipeline.js";

export class WorkoutService implements IWorkoutService {
  constructor(
    private readonly repository: IWorkoutRepository,
    private readonly scoringStrategy: IScoringStrategy,
  ) {}

  getWorkouts(filters: WorkoutFilters): ScoredWorkout[] {
    const strategies = WorkoutFilterFactory.createFromFilters(filters);
    const pipeline = new WorkoutFilterPipeline(strategies);
    const filtered = pipeline.apply(this.repository.findAll());
    const favoriteIds = filters.favoriteIds ?? [];

    if (favoriteIds.length === 0) {
      return filtered
        .sort((a, b) => a.name.localeCompare(b.name, "fr"))
        .map((workout) => ({ workout, score: 0 }));
    }

    return this.scoringStrategy.score(filtered, favoriteIds);
  }

  getWorkoutById(id: number) {
    return this.repository.findById(id) ?? null;
  }

  getCategories(): string[] {
    const categories = this.repository
      .findAll()
      .map((workout) => workout.category);

    return [...new Set(categories)].sort((a, b) => a.localeCompare(b, "fr"));
  }
}
