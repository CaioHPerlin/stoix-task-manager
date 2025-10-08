import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashingService {
    private readonly DEFAULT_SALT_ROUNDS = 10;

    constructor() {}

    async hash(payload: string, saltRounds?: number): Promise<string> {
        const rounds = saltRounds ?? this.DEFAULT_SALT_ROUNDS;
        return bcrypt.hash(payload, rounds);
    }

    async compare(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);
    }
}
