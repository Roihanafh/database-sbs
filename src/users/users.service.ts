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
        const savedUser = await this.usersRepository.save(newUser);
        return plainToInstance(Users, savedUser);
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
        // Check if user exists
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }

        // Only update if there are fields to update
        if (updateUserDto && Object.keys(updateUserDto).length > 0) {
            await this.usersRepository.update(id, updateUserDto);
        }

        const updatedUser = await this.usersRepository.findOneBy({ id });
        return plainToInstance(Users, updatedUser);
    }

    //delete user by id
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    //find user by email
    async findUserByEmail(email: string): Promise<Users | null>  {
        const user = await this.usersRepository.findOneBy({ email });
        return plainToInstance(Users, user);
    }
}
