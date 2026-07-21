import { WorkoutSource } from "../acces-donnees/sources/workout.source.js";
import { WorkoutRepository } from "../acces-donnees/repositories/workout.repository.js";
import { BarycenterScoringStrategy } from "../metier/scoring/barycenter-scoring.strategy.js";
import { WorkoutService } from "../metier/services/workout.service.js";
import { WorkoutController } from "../presentation/controllers/workout.controller.js";
import { WorkoutRequestParser } from "../presentation/parsers/workout-request.parser.js";
import { ApiRouter } from "../presentation/routes/index.js";
import { App, createApp } from "../app.js";
import type { Express } from "express";

export class Container {
  private static instance: Container | undefined;

  readonly workoutController: WorkoutController;
  readonly apiRouter: ApiRouter;
  readonly app: App;

  private constructor() {
    const dataSource = new WorkoutSource();
    const repository = new WorkoutRepository(dataSource);
    const scoringStrategy = new BarycenterScoringStrategy();
    const service = new WorkoutService(repository, scoringStrategy);
    const requestParser = new WorkoutRequestParser();

    this.workoutController = new WorkoutController(service, requestParser);
    this.apiRouter = new ApiRouter(this.workoutController);
    this.app = new App(this.apiRouter);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  createExpressApp(): Express {
    return createApp(this.apiRouter);
  }
}
