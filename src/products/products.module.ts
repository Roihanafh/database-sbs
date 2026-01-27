import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './entity/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
