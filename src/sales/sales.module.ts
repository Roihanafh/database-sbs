import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesDetailsEntity } from './entity/sales-details.entity';
import { SalesEntity } from './entity/sales.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesEntity, SalesDetailsEntity])
  ],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
