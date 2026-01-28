import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UpdateCategoriesDto {
    @ApiProperty({ example: 'Beverages', description: 'Name of the category', required: false })
    @IsString()
    @IsOptional()
    name?: string;
}