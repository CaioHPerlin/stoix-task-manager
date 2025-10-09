import {
    Injectable,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, TaskStatus } from "./entities/task.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateTaskDto, UpdateTaskDto, TaskDto } from "./dto";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

    async create(userId: number, createTaskDto: CreateTaskDto): Promise<TaskDto> {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            user: { id: userId },
        });
        const savedTask = await this.tasksRepository.save(task);
        return new TaskDto(savedTask);
    }

    async list(userId: number, status?: TaskStatus): Promise<TaskDto[]> {
        const where: FindOptionsWhere<Task> = { user: { id: userId } };
        if (status) {
            if (!Object.values(TaskStatus).includes(status)) {
                throw new BadRequestException(
                    `Invalid status: ${status}. Valid statuses are: ${Object.values(TaskStatus).join(", ")}`,
                );
            }
            where.status = status;
        }

        const tasks = await this.tasksRepository.find({
            where,
            order: { createdAt: "DESC" },
        });

        return tasks.map((task) => new TaskDto(task));
    }

    private async loadTaskEntityOrThrow(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ["user"] });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    private ensureOwnership(userId: number, task: Task) {
        if (task.user?.id !== userId) {
            throw new UnauthorizedException(`Task with ID ${task.id} does not belong to this user`);
        }
    }

    async getById(userId: number, id: number): Promise<TaskDto> {
        const task = await this.loadTaskEntityOrThrow(id);
        console.log(typeof task.user.id);
        console.log(typeof userId);
        this.ensureOwnership(userId, task);

        return new TaskDto(task);
    }

    async update(userId: number, id: number, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
        if (!id || id <= 0) {
            throw new BadRequestException("Invalid task ID");
        }

        if (Object.keys(updateTaskDto).length === 0) {
            throw new BadRequestException("No fields provided to update");
        }

        const task = await this.loadTaskEntityOrThrow(id);
        this.ensureOwnership(userId, task);

        Object.assign(task, updateTaskDto);
        const updatedTask = await this.tasksRepository.save(task);

        return new TaskDto(updatedTask);
    }

    async remove(userId: number, id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new BadRequestException("Invalid task ID");
        }

        const task = await this.loadTaskEntityOrThrow(id);
        this.ensureOwnership(userId, task);

        await this.tasksRepository.remove(task);
    }
}
