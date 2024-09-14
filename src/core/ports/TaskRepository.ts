import { Task } from "../entities/Task";

export interface TaskRepository {
    save(task: Task): Promise<Task>;
    findAllByProject(projectId: number): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    delete(id: number): Promise<void>;
}
