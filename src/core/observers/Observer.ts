import { Task } from "../entities/Task";

// src/core/observers/Observer.ts
export interface Observer {
    notify(task: Task): void;
}

export class Employee implements Observer {
    notify(task: Task): void {
        console.log(`Notificación para empleado: Nueva tarea asignada - ${task.description}`);
    }
}
