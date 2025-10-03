import { plainToInstance } from "class-transformer";
import { IsInt, IsOptional, IsString, validateSync } from "class-validator";

export class EnvironmentVariables {
    @IsInt()
    @IsOptional()
    PORT: number = 5000;
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
