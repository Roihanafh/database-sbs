import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    @ApiProperty({ example: 1, description: 'Category ID' })
    @IsNotEmpty()
    @IsNumber() 
    category_id: number;
    @ApiProperty({ example: 'Sushi', description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ example: 20000, description: 'Price of the product in RP' })
    @IsNumber() 
    @IsNotEmpty()
    price: number;
    @ApiProperty({ example: 100, description: 'Stock quantity of the product' })
    @IsNumber()  
    @IsNotEmpty()
    stock: number;
}