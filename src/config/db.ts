import { DataSource } from "typeorm";
import { Project } from "../core/entities/Project";
import { Task } from "../core/entities/Task";

export class AppDataSource {
    private static instance: DataSource;

    private constructor() {} // Constructor privado para evitar instanciación externa

    public static getInstance(): DataSource {
        if (!AppDataSource.instance) {
            // Si la instancia aún no ha sido creada, se crea una nueva
            AppDataSource.instance = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",   // Reemplaza con tu usuario
                password: "123456",     // Reemplaza con tu contraseña
                database: "project_management",
                entities: [Project, Task],
                synchronize: true,       // No usar en producción
            });
        }
        return AppDataSource.instance;
    }
}
