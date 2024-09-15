import { TaskRepository } from "../ports/TaskRepository";
import { Task } from "../entities/Task";
import { PriorityStrategy } from "../strategies/PriorityStrategy";
import { Observer } from "../observers/Observer";
import { TaskNotifier } from "../observers/TaskNotifier";

export class TaskService {
    private notifier: TaskNotifier = new TaskNotifier();

    constructor(private taskRepository: TaskRepository, private strategy: PriorityStrategy) {}

    // Agrega un observador (en este caso, un empleado)
    addObserver(observer: Observer): void {
        this.notifier.addObserver(observer);
    }

    // Crear una nueva tarea y notificar a los observadores
    async createTask(description: string, projectId: number, deadline: string): Promise<Task> {
        const task = new Task();
        task.description = description;
        task.project = { id: projectId } as any;
        task.deadline = deadline;
        task.priority = this.calculateTaskPriority(task).toString();

        // Guardar la tarea
        const savedTask = await this.taskRepository.save(task);

        // Notificar a los observadores después de guardar la tarea
        this.notifier.notifyObservers(savedTask);

        return savedTask;
    }

    // Obtener tareas por proyecto
    async getTasksByProject(projectId: number): Promise<Task[]> {
        return await this.taskRepository.findAllByProject(projectId);
    }

    // Obtener una tarea por ID
    async getTaskById(id: number): Promise<Task | null> {
        return await this.taskRepository.findById(id);
    }

    // Eliminar una tarea
    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }

    // Calcular la prioridad de la tarea usando la estrategia seleccionada
    calculateTaskPriority(task: Task): number {
        return this.strategy.calculatePriority(task);
    }
}
