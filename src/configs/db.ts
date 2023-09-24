import "reflect-metadata";
import { DataSource } from "typeorm";
import configs from "./index";

const {
  postgres: { host, port, name, username, password },
} = configs;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  password,
  username,
  port,
  database: name,
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: [],
  subscribers: [],
});
