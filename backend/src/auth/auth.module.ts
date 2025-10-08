import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/config/environment-variables";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
                secret: configService.get("JWT_SECRET"),
            }),
        }),
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
