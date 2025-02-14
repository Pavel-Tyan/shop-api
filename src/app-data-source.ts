import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 15432,
  username: "admin",
  password: "123",
  database: "db",
  entities: ["src/entities/**/*.ts"],
  logging: true,
  synchronize: true,
});
