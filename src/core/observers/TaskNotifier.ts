// src/core/observers/TaskNotifier.ts
import { Task } from "../entities/Task";
import { Observer } from "./Observer";

export class TaskNotifier {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    notifyObservers(task: Task): void {
        this.observers.forEach(observer => observer.notify(task));
    }
}
