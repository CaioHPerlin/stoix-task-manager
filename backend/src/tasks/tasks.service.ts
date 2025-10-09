import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, TaskStatus } from "./entities/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto, UpdateTaskDto, TaskDto } from "./dto";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

    async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
        const task = this.tasksRepository.create(createTaskDto);
        const savedTask = await this.tasksRepository.save(task);
        return new TaskDto(savedTask);
    }

    async findAll(): Promise<TaskDto[]> {
        const tasks = await this.tasksRepository.find({
            order: { createdAt: "DESC" },
        });
        return tasks.map((task) => new TaskDto(task));
    }

    async findOneById(id: number): Promise<TaskDto> {
        if (!id || id <= 0) {
            throw new BadRequestException("Invalid task ID");
        }

        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return new TaskDto(task);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
        if (!id || id <= 0) {
            throw new BadRequestException("Invalid task ID");
        }

        if (Object.keys(updateTaskDto).length === 0) {
            throw new BadRequestException("No fields provided to update");
        }

        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Merge the updates
        Object.assign(task, updateTaskDto);
        const updatedTask = await this.tasksRepository.save(task);

        return new TaskDto(updatedTask);
    }

    async remove(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new BadRequestException("Invalid task ID");
        }

        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        await this.tasksRepository.remove(task);
    }

    async getTasksByStatus(status: string): Promise<TaskDto[]> {
        // validate if status == one of the enum values
        if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
            throw new BadRequestException(
                `Invalid status: ${status}. Valid statuses are: ${Object.values(TaskStatus).join(", ")}`,
            );
        }

        const tasks = await this.tasksRepository.find({
            where: { status: status as TaskStatus },
            order: { createdAt: "DESC" },
        });

        return tasks.map((task) => new TaskDto(task));
    }
}
