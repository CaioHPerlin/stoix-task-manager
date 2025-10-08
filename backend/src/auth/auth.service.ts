import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignUpDto } from "./dto";
import { UserDto } from "src/users/dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(signUpDto: SignUpDto): Promise<UserDto> {
        const { email, password, name } = signUpDto;
        const userDto = await this.usersService.create(email, password, name);
        return userDto;
    }
}
