import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { validate } from "./env.schema";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validate,
        }),
    ],
})
export class ConfigModule {}
