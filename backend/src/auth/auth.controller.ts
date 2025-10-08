import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserDto } from "src/users/dto";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return this.authService.signUp(signUpDto);
    }

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto): Promise<true> {
        return this.authService.signIn(signInDto);
    }
}
