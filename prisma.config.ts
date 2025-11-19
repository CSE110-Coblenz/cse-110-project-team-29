import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic", // optional, default is ok
  datasource: {
    url: env("DATABASE_URL"), // reads from .env
  },
});
