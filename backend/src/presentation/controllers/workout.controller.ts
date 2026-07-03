import type { Request, Response } from "express";
import type { IWorkoutService } from "../../interfaces/workout-service.interface.js";
import type { IWorkoutRequestParser } from "../../interfaces/workout-request-parser.interface.js";
import { ApiResponseBuilder } from "../../models/api-response.model.js";

export class WorkoutController {
  constructor(
    private readonly workoutService: IWorkoutService,
    private readonly requestParser: IWorkoutRequestParser,
  ) {}

  getAllWorkouts(req: Request, res: Response): void {
    const filters = this.requestParser.parseFilters(req);
    const workouts = this.workoutService.getWorkouts(filters);

    res.json(
      ApiResponseBuilder.success(workouts.map((workout) => workout.toJSON())),
    );
  }

  getOneWorkout(req: Request, res: Response): void {
    const id = this.requestParser.parseId(req);

    if (id === null) {
      res.status(400).json(ApiResponseBuilder.error("Id invalide"));
      return;
    }

    const workout = this.workoutService.getWorkoutById(id);

    if (!workout) {
      res.status(404).json(ApiResponseBuilder.error("Séance introuvable"));
      return;
    }

    res.json(ApiResponseBuilder.success(workout.toJSON()));
  }

  getAllCategories(_req: Request, res: Response): void {
    const categories = this.workoutService.getCategories();

    res.json(ApiResponseBuilder.success(categories));
  }
}
