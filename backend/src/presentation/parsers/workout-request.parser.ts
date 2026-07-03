import type { Request } from "express";
import type { WorkoutFilters } from "../../models/workout.model.js";
import type { IWorkoutRequestParser } from "../../interfaces/workout-request-parser.interface.js";

export class WorkoutRequestParser implements IWorkoutRequestParser {
  parseFilters(req: Request): WorkoutFilters {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const rawMaxDuration =
      typeof req.query.maxDuration === "string"
        ? Number(req.query.maxDuration)
        : undefined;

    const maxDuration =
      rawMaxDuration !== undefined && !Number.isNaN(rawMaxDuration)
        ? rawMaxDuration
        : undefined;

    return { category, maxDuration };
  }

  parseId(req: Request): number | null {
    const id = Number(req.params.id);
    return Number.isNaN(id) ? null : id;
  }
}
