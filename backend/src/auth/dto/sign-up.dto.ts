import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: "Name must not exceed 100 characters" })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: "Email must not exceed 100 characters" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;
}
