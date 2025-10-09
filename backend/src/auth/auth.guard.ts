import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { EnvironmentVariables } from "src/config/environment-variables";
import { JwtPayload } from "./jwt-payload";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentVariables>,
    ) {}

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const secret = this.configService.get("JWT_SECRET");
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, { secret });

            request.user = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}
