import { Request, Response } from "express";
import { TaskService } from "../../core/services/TaskService";
import { PostgresTaskRepository } from "../repositories/PostgresTaskRepository";
import { BusinessImpactPriority, DeadlinePriority } from "../../core/strategies/PriorityStrategy";
import { Employee } from "../../core/observers/Observer";

// Aquí definimos la instancia de TaskService con una estrategia por defecto
const taskRepository = new PostgresTaskRepository();
const defaultStrategy = new DeadlinePriority(); // Estrategia por defecto
const taskService = new TaskService(taskRepository, defaultStrategy);

export class TaskController {

    static async createTask(req: Request, res: Response) {
        const { description, projectId, strategyType } = req.body;

        // Elegir la estrategia según la solicitud
        let strategy;
        switch (strategyType) {
            case 'deadline':
                strategy = new DeadlinePriority();
                break;
            case 'businessImpact':
                strategy = new BusinessImpactPriority();
                break;
            default:
                return res.status(400).json({ message: "Invalid strategy type" });
        }

        // Usar la estrategia seleccionada en lugar de la por defecto
        const customTaskService = new TaskService(taskRepository, strategy);

        const employee = new Employee();
        taskService.addObserver(employee);
        
        const task = await customTaskService.createTask(description, parseInt(projectId));
        res.status(201).json(task);
    }

    static async getTasksByProject(req: Request, res: Response) {
        const { projectId } = req.params;
        const tasks = await taskService.getTasksByProject(parseInt(projectId));
        res.json(tasks);
    }

    static async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        await taskService.deleteTask(parseInt(id));
        res.status(204).send();
    }
}
