import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDto {
    @IsOptional()
    @IsNumber() 
    category_id: number;
    @ApiProperty({ example: 'Sushi', description: 'Name of the product' })
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty({ example: 20000, description: 'Price of the product in RP' })
    @IsNumber() 
    @IsOptional()
    price: number;
    @ApiProperty({ example: 100, description: 'Stock quantity of the product' })
    @IsNumber()  
    @IsOptional()
    stock: number;
}