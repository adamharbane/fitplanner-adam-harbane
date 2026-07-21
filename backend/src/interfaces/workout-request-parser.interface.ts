import type { Request } from "express";
import type { WorkoutFilters } from "../models/workout.model.js";

export interface IWorkoutRequestParser {
  parseFilters(req: Request): WorkoutFilters;
  parseId(req: Request): number | null;
}
