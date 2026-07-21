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

    const favoriteIds = this.parseFavoriteIds(req);

    return { category, maxDuration, favoriteIds };
  }

  private parseFavoriteIds(req: Request): number[] | undefined {
    const rawValue = req.query.favoriteIds;

    if (typeof rawValue !== "string" || rawValue.trim() === "") {
      return undefined;
    }

    const ids = rawValue
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((id) => !Number.isNaN(id));

    return ids.length > 0 ? ids : undefined;
  }

  parseId(req: Request): number | null {
    const id = Number(req.params.id);
    return Number.isNaN(id) ? null : id;
  }
}
