import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Task, task => task.project)
    tasks!: Task[];  // También aseguramos que la relación de tareas sea definida más tarde

    // Extender la entidad Project para subproyectos
    @OneToMany(() => Project, subProject => subProject.parentProject)
    subProjects!: Project[];

    @ManyToOne(() => Project, parentProject => parentProject.subProjects)
    parentProject!: Project;
}
