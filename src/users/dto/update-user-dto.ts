import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'john@example.com', description: 'User email' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({ example: 'password123', description: 'User password' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ example: 'admin', description: 'User role' })
    @IsOptional()
    @IsString()
    role?: string;
}
