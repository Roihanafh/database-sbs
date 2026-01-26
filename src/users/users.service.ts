import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { plainToInstance } from 'class-transformer';

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

    //get all users
    async findAll(): Promise<Users[]> {
        const users = await this.usersRepository.find();
        return plainToInstance(Users, users);
    }

    //get user by id
    async findOne(id: number): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ id });
        return plainToInstance(Users, user);
    }

    //update user by id
    async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<Users> {
        await this.usersRepository.update(id, updateUserDto);
        const updatedUser = await this.usersRepository.findOneBy({ id });
        return plainToInstance(Users, updatedUser);
    }

    //delete user by id
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
