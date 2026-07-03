export class EnvConfig {
  readonly port: number;
  readonly corsOrigin: string;

  constructor() {
    this.port = Number(process.env.PORT) || 3001;
    this.corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
  }
}

export const envConfig = new EnvConfig();
