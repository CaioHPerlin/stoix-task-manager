import { IsString, IsNotEmpty, IsEnum, IsOptional, MaxLength } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: "Title must not exceed 255 characters" })
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus = TaskStatus.PENDING;
}
