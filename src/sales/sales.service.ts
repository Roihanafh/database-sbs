import { Injectable } from '@nestjs/common';
import { SalesEntity } from './entity/sales.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesDetailsEntity } from './entity/sales-details.entity';
import { plainToInstance } from 'class-transformer';
import { CreateSaleDto } from './dto/create-sale-dto';
import e from 'express';
import { ProductsEntity } from 'src/products/entity/products.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(SalesEntity)
        private salesRepository: Repository<SalesEntity>,

        @InjectRepository(SalesDetailsEntity)
        private salesDetailsRepository: Repository<SalesDetailsEntity>,

        @InjectRepository(ProductsEntity)
        private productsRepository: Repository<ProductsEntity>,

    ) { }

    async findAll(): Promise<SalesEntity[]> {

        const sales =await this.salesRepository.find({  relations: ['sales_details', 'user'] });
        return plainToInstance(SalesEntity, sales);
    }

    async findOne(id: number): Promise<SalesEntity> {
        const sale = await this.salesRepository.findOne({ where: { id }, relations: ['sales_details', 'user'] });
        return plainToInstance(SalesEntity, sale);
    }

    async create(createSaleDto: CreateSaleDto): Promise<SalesEntity | undefined | null> {
        const sale_id = await this.findOneByDate(createSaleDto.sale_date);
        
        const product = await this.productsRepository.findOneBy({ id: createSaleDto.product_id });
        if (!product) {
            throw new Error('Product not found');
        }
        const price = product.price * createSaleDto.qty;

        if (!sale_id) {
            const sale = this.salesRepository.create({
                sale_date: createSaleDto.sale_date,
                user: { id: createSaleDto.user_id },
                total_amount: price
            });
            const savedSale = await this.salesRepository.save(sale);

            const saleDetails = this.salesDetailsRepository.create({
                sales: { id: savedSale.id },
                product:{ id: createSaleDto.product_id},
                qty: createSaleDto.qty,
                price: price
            });
            await this.salesDetailsRepository.save(saleDetails);

            return this.findOne(savedSale.id);
        }

        const existingSale = await this.findOne(sale_id);
        if (existingSale) {
            existingSale.total_amount += price;
            await this.salesRepository.save(existingSale);

            const saleDetails = this.salesDetailsRepository.create({
                sales: { id: existingSale.id },
                product:{ id: createSaleDto.product_id},
                qty: createSaleDto.qty,
                price: price
            });
            await this.salesDetailsRepository.save(saleDetails);
        }
        return this.findOne(sale_id);
    }

    async findOneByDate(sale_date: Date): Promise<number > {
        const sale = await this.salesRepository.findOne({ where: { sale_date } });
        return sale ? sale.id : 0;
    }
            
}
