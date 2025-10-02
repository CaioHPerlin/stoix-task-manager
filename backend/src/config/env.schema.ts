import { IsInt } from "class-validator";

export class EnvironmentVariables {
    @IsInt()
    PORT: number;
}
