import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CreateSaleDto {
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    sale_date: Date;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

}