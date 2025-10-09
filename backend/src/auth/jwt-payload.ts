import { UserDto } from "src/users/dto";

export class JwtPayload {
    sub: string;
    name: string;

    constructor(userDto: UserDto) {
        this.sub = String(userDto.id);
        this.name = userDto.name;
    }
}
