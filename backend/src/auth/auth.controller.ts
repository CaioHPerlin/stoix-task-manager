import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserDto } from "src/users/dto";
import { AuthService } from "./auth.service";
import { AuthDto, SignInDto, SignUpDto } from "./dto";
import { User } from "src/common/decorators/user.decorator";
import { Public } from "src/common/decorators/public.decorator";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return this.authService.signUp(signUpDto);
    }

    @Public()
    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto): Promise<AuthDto> {
        return this.authService.signIn(signInDto);
    }

    @Get("profile")
    getProfile(@User("sub") userId: string) {
        return this.authService.getProfile(+userId);
    }
}
