import { plainToInstance } from "class-transformer";
import { IsInt, IsOptional, validateSync } from "class-validator";

export class Env {
    @IsInt()
    @IsOptional()
    PORT: number = 5000;
}

export function validate(config: Record<string, unknown>): Env {
    // transform
    const transformedConfig = plainToInstance(Env, config, {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
    });

    // validate
    const errors = validateSync(transformedConfig, {
        skipMissingProperties: false,
        whitelist: false,
        forbidUnknownValues: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return transformedConfig;
}
