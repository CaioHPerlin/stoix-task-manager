import { Task, TaskStatus } from "../entities/task.entity";

export class TaskDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;

    constructor(task: Task) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt;
    }
}
