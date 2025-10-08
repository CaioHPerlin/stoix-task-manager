import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";

const coreModules = [ConfigModule, DatabaseModule];
const featureModules = [HealthModule, TasksModule, AuthModule];

@Module({
    imports: [...coreModules, ...featureModules],
})
export class AppModule {}
