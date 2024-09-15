// core/services/ProjectTaskFacade.ts
import { ProjectService } from "./ProjectService";
import { TaskService } from "./TaskService";

export class ProjectTaskFacade {
    constructor(
        private projectService: ProjectService,
        private taskService: TaskService
    ) {}

    async createProjectWithTask(projectName: string, taskDescription: string) {
        const project = await this.projectService.createProject(projectName);
        await this.taskService.createTask(taskDescription, project.id, "2021-12-31");
        return project;
    }

    async getAllProjectsWithTasks() {
        const projects = await this.projectService.getAllProjects();
        return projects;
    }
}
