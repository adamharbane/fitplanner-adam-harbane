import { createApp } from "./app.js";
import { PORT } from "./config/env.js";

const app = createApp();

app.listen(PORT, () => {
  console.log(`API FitPlanner disponible sur http://localhost:${PORT}`);
});
