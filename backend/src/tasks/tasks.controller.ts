import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
    ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto, TaskDto } from "./dto";
import { TaskStatus } from "./entities/task.entity";
import { User } from "src/common/decorators";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @User("sub") userId: string,
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.create(+userId, createTaskDto);
        return {
            message: "Task created successfully",
            data: task,
        };
    }

    @Get()
    async findAll(
        @User("sub") userId: string,
        @Query("status") status?: TaskStatus,
    ): Promise<{ message: string; data: TaskDto[]; count: number }> {
        let tasks: TaskDto[];

        tasks = await this.tasksService.list(+userId, status);

        return {
            message: "Tasks retrieved successfully",
            data: tasks,
            count: tasks.length,
        };
    }

    @Get(":id")
    async findOne(
        @User("sub") userId: string,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.getById(+userId, id);
        return {
            message: "Task retrieved successfully",
            data: task,
        };
    }

    @Patch(":id")
    async update(
        @User("sub") userId: string,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.update(+userId, id, updateTaskDto);
        return {
            message: "Task updated successfully",
            data: task,
        };
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @User("sub") userId: string,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        await this.tasksService.remove(+userId, id);
    }
}
