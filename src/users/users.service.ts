import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) 
        private usersRepository: Repository<Users>,
    ) {}

    //create user
    async create(createUserDto: CreateUserDto): Promise<Users> {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);

    }
}
