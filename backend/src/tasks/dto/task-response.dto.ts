import { TaskStatus } from "../entities/task.entity";

export class TaskResponseDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;

    constructor(partial: Partial<TaskResponseDto>) {
        Object.assign(this, partial);
    }
}
