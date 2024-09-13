import { DataSource } from "typeorm";
import { Project } from "../core/entities/Project";
import { Task } from "../core/entities/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",   // Reemplaza con tu usuario
    password: "postgres",   // Reemplaza con tu contraseña
    database: "project_management",
    entities: [Project, Task],
    synchronize: true,           // Solo para desarrollo (no usar en producción)
});
