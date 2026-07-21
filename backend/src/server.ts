import { Container } from "./container/container.js";
import { envConfig } from "./config/env.js";

class Server {
  start(): void {
    const container = Container.getInstance();
    const app = container.createExpressApp();

    app.listen(envConfig.port, () => {
      console.log(
        `API FitPlanner disponible sur http://localhost:${envConfig.port}`,
      );
    });
  }
}

new Server().start();
