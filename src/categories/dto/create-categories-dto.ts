import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateCategoriesDto {
    @ApiProperty({ example: 'Beverages', description: 'Name of the category' })
    @IsString()
    @IsNotEmpty()
    name: string;
}   