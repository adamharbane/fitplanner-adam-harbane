import cors from "cors";
import express, { type Express } from "express";
import type { ApiRouter } from "./presentation/routes/index.js";
import { envConfig } from "./config/env.js";
import { ApiResponseBuilder } from "./models/api-response.model.js";

export class App {
  readonly expressApp: Express;

  constructor(apiRouter: ApiRouter) {
    this.expressApp = express();
    this.configureMiddleware();
    this.configureRoutes(apiRouter);
  }

  private configureMiddleware(): void {
    this.expressApp.use(cors({ origin: envConfig.corsOrigin }));
    this.expressApp.use(express.json());
  }

  private configureRoutes(apiRouter: ApiRouter): void {
    this.expressApp.use("/api", apiRouter.router);

    this.expressApp.use((_req, res) => {
      res.status(404).json(ApiResponseBuilder.error("Route introuvable"));
    });
  }
}

export function createApp(apiRouter: ApiRouter): Express {
  return new App(apiRouter).expressApp;
}
