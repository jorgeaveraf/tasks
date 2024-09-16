import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './config/db';
import { ProjectService } from './core/services/ProjectService';
import { TaskService } from './core/services/TaskService';
import { PostgresProjectRepository } from './adapters/repositories/PostgresProjectRepository';
import { PostgresTaskRepository } from './adapters/repositories/PostgresTaskRepository';
import { ProjectTaskFacade } from './core/services/ProjectTaskFacade';
import { DeadlinePriority, PriorityStrategy } from './core/strategies/PriorityStrategy'; // Estrategia de prioridad

// Inicializamos el servidor Express
const app = express();
app.use(express.json());
const dataSource = AppDataSource.getInstance();

// Inicializar la base de datos
dataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos exitosa.");

        // Instanciamos los repositorios
        const projectRepository = new PostgresProjectRepository();
        const taskRepository = new PostgresTaskRepository();

        // Instanciamos los servicios, y aplicamos una estrategia concreta
        const projectService = new ProjectService(projectRepository);
        const taskService = new TaskService(taskRepository, new DeadlinePriority());

        // Instanciamos la fachada (Facade) que coordina los servicios
        const projectTaskFacade = new ProjectTaskFacade(projectService, taskService);

        // Definimos rutas utilizando el Facade para manejar proyectos y tareas

        // Ruta para crear un proyecto con una tarea asociada
        app.post('/projects-with-tasks', async (req: Request, res: Response) => {
            const { projectName, taskDescription } = req.body;

            try {
                const project = await projectTaskFacade.createProjectWithTask(projectName, taskDescription);
                res.status(201).json({
                    message: 'Proyecto y tarea creados con éxito',
                    project
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creando proyecto y tarea.' });
            }
        });

        // Ruta para obtener todos los proyectos con sus tareas
        app.get('/projects-with-tasks', async (req: Request, res: Response) => {
            try {
                const projects = await projectTaskFacade.getAllProjectsWithTasks();
                res.status(200).json(projects);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error obteniendo proyectos y tareas.' });
            }
        });

        // Iniciar el servidor en el puerto 3000
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.log("Error de conexión a la base de datos:", error));

