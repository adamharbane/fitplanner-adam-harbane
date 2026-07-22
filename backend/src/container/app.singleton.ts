import { WorkoutSource } from "../acces-donnees/sources/workout.source.js";
import { WorkoutRepository } from "../acces-donnees/repositories/workout.repository.js";
import { BarycenterScoringStrategy } from "../metier/scoring/barycenter-scoring.strategy.js";
import { WeightedScoringDecorator } from "../metier/scoring/weighted-scoring.decorator.js";
import { WorkoutService } from "../metier/services/workout.service.js";
import { WorkoutController } from "../presentation/controllers/workout.controller.js";
import { WorkoutRequestParser } from "../presentation/parsers/workout-request.parser.js";
import { ApiRouter } from "../presentation/routes/index.js";
import { App, createApp } from "../app.js";
import type { Express } from "express";

export class AppSingleton {
  private static instance: AppSingleton | undefined;

  readonly workoutController: WorkoutController;
  readonly apiRouter: ApiRouter;
  readonly app: App;

  private constructor() {
    const dataSource = new WorkoutSource();
    const repository = new WorkoutRepository(dataSource);
    const barycenterStrategy = new BarycenterScoringStrategy();
    const scoringStrategy = new WeightedScoringDecorator(barycenterStrategy, {
      category: 2,
      duration: 1.5,
      difficulty: 1.2,
      equipment: 0.8,
    });
    const service = new WorkoutService(repository, scoringStrategy);
    const requestParser = new WorkoutRequestParser();

    this.workoutController = new WorkoutController(service, requestParser);
    this.apiRouter = new ApiRouter(this.workoutController);
    this.app = new App(this.apiRouter);
  }

  static getInstance(): AppSingleton {
    if (!AppSingleton.instance) {
      AppSingleton.instance = new AppSingleton();
    }
    return AppSingleton.instance;
  }

  createExpressApp(): Express {
    return createApp(this.apiRouter);
  }
}
