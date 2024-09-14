import { Task } from '../entities/Task'; // Importa la entidad Task

export interface PriorityStrategy {
    calculatePriority(task: Task): number;
}

// Estrategia basada en la fecha límite
export class DeadlinePriority implements PriorityStrategy {
    calculatePriority(task: Task): number {
        const now = new Date();
        const deadline = new Date(task.deadline);
        return deadline > now ? 1 : 5;
    }
}

// Estrategia basada en el impacto en el negocio
export class BusinessImpactPriority implements PriorityStrategy {
    calculatePriority(task: Task): number {
        return task.priority === 'high' ? 5 : 1;  }
}
