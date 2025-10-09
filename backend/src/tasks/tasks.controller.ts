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
    ValidationPipe,
    ParseIntPipe,
    UsePipes,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto, TaskDto } from "./dto";
import { TaskStatus } from "./entities/task.entity";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.create(createTaskDto);
        return {
            message: "Task created successfully",
            data: task,
        };
    }

    @Get()
    async findAll(
        @Query("status") status?: TaskStatus,
    ): Promise<{ message: string; data: TaskDto[]; count: number }> {
        let tasks: TaskDto[];

        if (status) {
            tasks = await this.tasksService.getTasksByStatus(status);
        } else {
            tasks = await this.tasksService.findAll();
        }

        return {
            message: "Tasks retrieved successfully",
            data: tasks,
            count: tasks.length,
        };
    }

    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.findOneById(id);
        return {
            message: "Task retrieved successfully",
            data: task,
        };
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<{ message: string; data: TaskDto }> {
        const task = await this.tasksService.update(id, updateTaskDto);
        return {
            message: "Task updated successfully",
            data: task,
        };
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.tasksService.remove(id);
    }
}
