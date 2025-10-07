import { IsString, IsEnum, IsOptional, MaxLength } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @MaxLength(255, { message: "Title must not exceed 255 characters" })
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
