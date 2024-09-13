import { ProjectRepository } from "../../core/ports/ProjectRepository";
import { Project } from "../../core/entities/Project";
import { AppDataSource } from "../../config/db";

export class PostgresProjectRepository implements ProjectRepository {
    private repository = AppDataSource.getRepository(Project);

    async save(project: Project): Promise<Project> {
        return await this.repository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Project | null> {
        return await this.repository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
