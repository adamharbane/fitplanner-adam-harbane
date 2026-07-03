import type { Workout } from "../models/workout.model.js";

export interface IWorkoutRepository {
  findAll(): Workout[];
  findById(id: number): Workout | undefined;
}
