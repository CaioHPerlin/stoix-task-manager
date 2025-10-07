import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [HealthModule, ConfigModule, DatabaseModule],
})
export class AppModule {}
