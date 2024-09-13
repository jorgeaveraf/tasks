import { Project } from "../entities/Project";

export interface ProjectRepository {
    save(project: Project): Promise<Project>;
    findAll(): Promise<Project[]>;
    findById(id: number): Promise<Project | null>;
    delete(id: number): Promise<void>;
}
