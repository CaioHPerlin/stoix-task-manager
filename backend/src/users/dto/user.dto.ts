import { User } from "../entities/user.entity";

export class UserDto {
    id: number;
    email: string;
    name: string;
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.createdAt = user.createdAt;
    }
}
