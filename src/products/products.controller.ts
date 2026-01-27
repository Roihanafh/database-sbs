import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts() {
        return this.productsService.findAll();
    }

    @Get(':id')
    async getProductById(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Post("create")
    async createProduct(@Body()createProductDto: CreateProductDto) {
        await this.productsService.create(createProductDto);
        return { message: 'Product created successfully' };
    }

    @Patch('update/:id')
    async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        await this.productsService.update(+id, updateProductDto);
        return { message: 'Product updated successfully' };
    }

    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: number) {
        await this.productsService.remove(id);
        return { message: 'Product deleted successfully' };
    }
}