import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserDto } from "src/users/dto";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return this.authService.signUp(signUpDto);
    }
}
