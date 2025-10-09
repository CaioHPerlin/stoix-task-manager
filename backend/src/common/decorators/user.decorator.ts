import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/auth/jwt-payload";

export const User = createParamDecorator(
    (data: keyof JwtPayload, context: ExecutionContext): JwtPayload | string => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload;

        return data ? user?.[data] : user;
    },
);
