import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(()=> AuthModule), // to avoid circular dependency
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
