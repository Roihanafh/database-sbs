import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'User email' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'admin', description: 'User role' })
    @IsNotEmpty()
    @IsString()
    role: string;
}