import type { Workout } from "../../models/workout.model.js";
import type { IWorkoutDataSource } from "../../interfaces/workout-data-source.interface.js";
import type { IWorkoutRepository } from "../../interfaces/workout-repository.interface.js";

export class WorkoutRepository implements IWorkoutRepository {
  constructor(private readonly dataSource: IWorkoutDataSource) {}

  findAll(): Workout[] {
    return this.dataSource.getAll();
  }

  findById(id: number): Workout | undefined {
    return this.dataSource.getAll().find((workout) => workout.id === id);
  }
}
