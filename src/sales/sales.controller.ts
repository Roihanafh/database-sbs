import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale-dto';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Get()
    async getSales() {
        return this.salesService.findAll();
    }

    @Post("create")
    async createSale(@Body() createSaleDto: CreateSaleDto) {
        return this.salesService.create(createSaleDto);
    }
}
