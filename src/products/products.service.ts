import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entity/products.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private productsRepository: Repository<ProductsEntity>,
    ) {}

    //get all products
    async findAll(): Promise<ProductsEntity[]> {
        const products = await this.productsRepository.find();
        return plainToInstance(ProductsEntity, products);
    }

    //get product by id
    async findOne(id: number): Promise<ProductsEntity> {
        const product = await this.productsRepository.findOneBy({ id });
        return plainToInstance(ProductsEntity, product);    
    }

    //create product
    async create(createProductDto: CreateProductDto): Promise<ProductsEntity> {
        const newProduct = this.productsRepository.create(createProductDto);
        const savedProduct = await this.productsRepository.save(newProduct);
        return plainToInstance(ProductsEntity, savedProduct);
    }

    //update product by id
    async update(id: number, updateProductDto: Partial<CreateProductDto>): Promise<ProductsEntity> {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new Error('Product not found');
        }

        if (updateProductDto && Object.keys(updateProductDto).length > 0) {
            await this.productsRepository.update(id, updateProductDto);
        }

        const updatedProduct = await this.productsRepository.findOneBy({ id });
        return plainToInstance(ProductsEntity, updatedProduct);
    }

    //delete product by id
    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
    }
}