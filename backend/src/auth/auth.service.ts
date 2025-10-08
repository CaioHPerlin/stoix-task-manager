import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dto";
import { UserDto } from "src/users/dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(signUpDto: SignUpDto): Promise<UserDto> {
        const { email, password, name } = signUpDto;
        const userDto = await this.usersService.create(email, password, name);
        return userDto;
    }

    // Promise<true> is temporary while JWT is not in place
    async signIn(signInDto: SignInDto): Promise<true> {
        const { email, password } = signInDto;
        const userDto = await this.usersService.validateCredentials(email, password);
        return !!userDto;
    }
}
