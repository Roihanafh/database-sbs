import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { UpdateCategoriesDto } from './dto/update-categories-dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    async findOneBy(@Param('id') id: number) {
        return this.categoriesService.findOneBy(id);
    }
    
    @Post('create')
    async create(@Body() createCategoryDto: CreateCategoriesDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoriesDto) {
        return await this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        return await this.categoriesService.delete(id);
    }
}
