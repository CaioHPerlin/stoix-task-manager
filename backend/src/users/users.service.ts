import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { HashingService } from "src/common/hashing/hashing.service";
import { UserDto } from "./dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) {}

    async findByEmail(email: string): Promise<UserDto | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        return user ? new UserDto(user) : null;
    }

    async create(email: string, password: string, name: string): Promise<UserDto> {
        if (await this.findByEmail(email)) {
            throw new ConflictException("Email already in use");
        }

        const hashedPassword = await this.hashingService.hash(password);
        const newUser = this.usersRepository.create({ email, password: hashedPassword, name });
        await this.usersRepository.save(newUser);
        return new UserDto(newUser);
    }
}
