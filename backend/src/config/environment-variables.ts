import { plainToInstance } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min, validateSync } from "class-validator";

export class EnvironmentVariables {
    // App
    @IsInt()
    @Min(1)
    @Max(65535)
    @IsOptional()
    PORT: number = 5000;

    // Database
    @IsString()
    DB_HOST: string;

    @IsInt()
    @Min(1)
    @Max(65535)
    @IsOptional()
    DB_PORT: number = 5432;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_DATABASE: string;
}

export function validateEnvironmentVariables(
    config: Record<string, unknown>,
): EnvironmentVariables {
    const transformed = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
    });

    const errors = validateSync(transformed, {
        skipMissingProperties: false,
        whitelist: false,
        forbidUnknownValues: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return transformed;
}
