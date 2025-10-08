import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { TasksModule } from "./tasks/tasks.module";

const coreModules = [ConfigModule, DatabaseModule];
const featureModules = [HealthModule, TasksModule];

@Module({
    imports: [...coreModules, ...featureModules],
})
export class AppModule {}
