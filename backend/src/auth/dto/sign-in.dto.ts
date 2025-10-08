import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: "Email must not exceed 255 characters" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;
}
