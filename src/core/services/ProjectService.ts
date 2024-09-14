import { ProjectRepository } from "../ports/ProjectRepository";
import { Project } from "../entities/Project";

export class ProjectService {
    constructor(private projectRepository: ProjectRepository) {}

    async createProject(name: string): Promise<Project> {
        const project = new Project();
        project.name = name;
        return await this.projectRepository.save(project);
    }

    async getAllProjects(): Promise<Project[]> {
        return await this.projectRepository.findAll();
    }

    async getProjectById(id: number): Promise<Project | null> {
        return await this.projectRepository.findById(id);
    }

    async deleteProject(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }
}
