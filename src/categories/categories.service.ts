import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from './entity/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoriesDto } from './dto/create-categories-dto';
import { UpdateCategoriesDto } from './dto/update-categories-dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private categoriesRepository: Repository<CategoriesEntity>,
    ) {}

    //get all categories
    async findAll(): Promise<CategoriesEntity[]> {
        return await this.categoriesRepository.find();
    }

    //get category by id
    async findOneBy(id: number): Promise<CategoriesEntity | null> {
        return await this.categoriesRepository.findOneBy({ id });
    }

    //create category
    async create(createCategoryDto: CreateCategoriesDto): Promise<CategoriesEntity> {
        return await this.categoriesRepository.save(createCategoryDto);
    }

    //update category
    async update(id: number, updateCategoryDto: UpdateCategoriesDto): Promise<CategoriesEntity | null> {
        await this.categoriesRepository.update(id, updateCategoryDto);
        return this.findOneBy(id);
    }

    //delete category
    async delete(id: number): Promise<void> {
        await this.categoriesRepository.delete(id);
    }
}
