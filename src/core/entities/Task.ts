import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./Project";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;  
    
    @ManyToOne(() => Project, project => project.tasks)
    project!: Project;  

    @Column()
    priority!: string;
}
