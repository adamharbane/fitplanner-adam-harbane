import { AppSingleton } from "./container/app.singleton.js";
import { envConfig } from "./config/env.js";

class Server {
  start(): void {
    const appSingleton = AppSingleton.getInstance();
    const app = appSingleton.createExpressApp();

    app.listen(envConfig.port, () => {
      console.log(
        `API FitPlanner disponible sur http://localhost:${envConfig.port}`,
      );
    });
  }
}

new Server().start();
