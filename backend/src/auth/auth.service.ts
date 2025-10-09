import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthDto, SignInDto, SignUpDto } from "./dto";
import { UserDto } from "src/users/dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private async generateAccessTokenForUser(userDto: UserDto): Promise<string> {
        const payload = new JwtPayload(userDto);
        return this.jwtService.signAsync({ ...payload });
    }

    async signUp(signUpDto: SignUpDto): Promise<UserDto> {
        const { email, password, name } = signUpDto;
        const userDto = await this.usersService.create(email, password, name);
        return userDto;
    }

    async signIn(signInDto: SignInDto): Promise<AuthDto> {
        const { email, password } = signInDto;
        const userDto = await this.usersService.validateCredentials(email, password);

        const accessToken = await this.generateAccessTokenForUser(userDto);
        return { accessToken };
    }

    async getProfile(userId: number): Promise<UserDto> {
        return this.usersService.findOneById(userId);
    }
}
