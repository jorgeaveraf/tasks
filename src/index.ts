import 'reflect-metadata';
import { AppDataSource } from './config/db';

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos exitosa.");
        // Inicializar controladores y servicios aquí
    })
    .catch((error) => console.log("Error de conexión a la base de datos:", error));
