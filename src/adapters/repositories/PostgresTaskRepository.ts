import { TaskRepository } from "../../core/ports/TaskRepository";
import { Task } from "../../core/entities/Task";
import { Project } from "../../core/entities/Project";
import { AppDataSource } from "../../config/db";

export class PostgresTaskRepository implements TaskRepository {
    private repository = AppDataSource.getRepository(Task);

    async save(task: Task): Promise<Task> {
        return await this.repository.save(task);
    }

    async findAllByProject(projectId: number): Promise<Task[]> {
        const project = new Project();
        project.id = projectId; // Crear una instancia de Project con solo el id
        
        return await this.repository.find({
            where: {
                project: project // Aquí pasas el objeto completo Project
            }
        });
    }

    async findById(id: number): Promise<Task | null> {
        return await this.repository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
