import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from './config/config.module';

@Module({
    imports: [HealthModule, ConfigModule],
})
export class AppModule {}
