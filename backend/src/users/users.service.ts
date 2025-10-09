import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { HashingService } from "src/common/providers/hashing.service";
import { UserDto } from "./dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) {}

    private async findEntityByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneById(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException();
        }

        return new UserDto(user);
    }

    async create(email: string, password: string, name: string): Promise<UserDto> {
        if (await this.findEntityByEmail(email)) {
            throw new ConflictException("Email already in use");
        }

        const hashedPassword = await this.hashingService.hash(password);
        const newUser = this.usersRepository.create({ email, password: hashedPassword, name });
        await this.usersRepository.save(newUser);
        return new UserDto(newUser);
    }

    async validateCredentials(email: string, password: string): Promise<UserDto> {
        const user = await this.findEntityByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await this.hashingService.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        return new UserDto(user);
    }
}
