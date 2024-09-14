import { Request, Response } from "express";
import { ProjectService } from "../../core/services/ProjectService";
import { PostgresProjectRepository } from "../repositories/PostgresProjectRepository";

const projectService = new ProjectService(new PostgresProjectRepository());

export class ProjectController {
    static async createProject(req: Request, res: Response) {
        const { name } = req.body;
        const project = await projectService.createProject(name);
        res.status(201).json(project);
    }

    static async getAllProjects(req: Request, res: Response) {
        const projects = await projectService.getAllProjects();
        res.json(projects);
    }

    static async deleteProject(req: Request, res: Response) {
        const { id } = req.params;
        await projectService.deleteProject(parseInt(id));
        res.status(204).send();
    }
}
